import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { httpProtected } from "../apis/http";
import useRefreshToken from "./useRefreshToken";

const ACCESS_TOKEN_KEY = "accessToken";

let isRefreshing = false; // Sprecavanje višestrukih poziva za osvežavanje tokena
let refreshSubscribers = []; // Lista za čuvanje funkcija koje čekaju na osvežavanje tokena

const useHttpProtected = () => {
  const refresh = useRefreshToken();

  // Funkcija koja se koristi za prolazak kroz red čekanja i pozivanje svih funkcija
  // koje su čekale na osvežavanje tokena
  const processQueeue = (error, token = null) => {
    refreshSubscribers.forEach(cb => cb(error, token)); // Prolazak kroz sve funkcije u redu i pozivanje svake od njih
    refreshSubscribers = []; // Resetovanje liste nakon obrade
  };

  useEffect(() => {
    // Interceptor za zahtev koji dodaje Authorization header sa access tokenom
    const requestInterceptor = httpProtected.interceptors.request.use(
      async (config) => {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor za odgovor koji upravlja osvežavanjem tokena
    // i ponovnim slanjem zahteva u slučaju 401 ili 400 greške
    const responseInterceptor = httpProtected.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        // Proveri da li je greška 401 ili 400 i da li zahtev nije već poslat
        // Ovo je važno da bismo izbegli beskonačnu petlju osvežavanja tokena
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 400) &&
          !prevRequest?.sent
        ) {
          // Ako je token istekao i zahtev nije već poslat
          if (!isRefreshing) {
            isRefreshing = true;
            prevRequest.sent = true; // Oznaka da je zahtev već poslat
            try {
              const newAccessToken = await refresh(); // Osvežavanje tokena
              processQueeue(null, newAccessToken); // Prolazak kroz red i slanje novog tokena
              return httpProtected({
                ...prevRequest,
                headers: {
                  ...prevRequest.headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }); // Ponovno slanje originalnog zahteva sa novim tokenom
            } catch (refreshError) {
              processQueeue(refreshError, null); // Prolazak kroz red sa greškom
              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false; // Resetovanje stanja osvežavanja nakon što je proces završen
            }
          }
          // Ako je već u toku osvežavanje tokena, dodaj zahtev u red čekanja
          return new Promise((resolve, reject) => {
            refreshSubscribers.push((error, token) => {
              if (error) {
                reject(error); // Ako je došlo do greške prilikom osvežavanja tokena, odbaci grešku
              } else {
                resolve(
                  httpProtected({
                    ...prevRequest,
                    headers: {
                      ...prevRequest.headers,
                      Authorization: `Bearer ${token}`,
                    },
                  })
                ); // Ako je osvežavanje uspešno, ponovo pošalji zahtev sa novim tokenom
              }
            });
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpProtected.interceptors.request.eject(requestInterceptor);
      httpProtected.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh]);

  return httpProtected;
};

export default useHttpProtected;
