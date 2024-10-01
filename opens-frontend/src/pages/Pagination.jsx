import { useEffect, useState } from "react";

const Pagination = ({
  pages,
  setCurrentPage,
  array,
  limit,
  maxVisibleButtons,
}) => {
  const numOfPages = [];
  const [currentButton, setCurrentButton] = useState(1);

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  useEffect(() => {
    // Set-ovanje currentButton ako trenutna stranica premašuje broj novih stranica
    if (pages < currentButton) {
      setCurrentButton(pages);
    }
  }, [pages]);

  useEffect(() => {
    // Set-ovanje currentButton 1 na reload
    setCurrentButton(1);
  }, []);

  let startIdx = (currentButton - 1) * limit + 1;
  let endIdx = Math.min(currentButton * limit, array.length);

  if (array.length === 0) {
    startIdx = 0;
    endIdx = 0;
  }

  const renderPageButtons = () => {
    const buttons = [];
    const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);

    let startPage = Math.max(1, currentButton - halfMaxVisibleButtons);
    let endPage = Math.min(startPage + maxVisibleButtons - 1, pages);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <li key={1} className="page-item">
          <button className="page-link" onClick={() => setCurrentButton(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        buttons.push(
          <li key="startEllipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li
          key={i}
          className={`${
            currentButton === i ? "page-item active" : "page-item"
          }`}
        >
          <button className="page-link" onClick={() => setCurrentButton(i)}>
            {i}
          </button>
        </li>
      );
    }

    if (endPage < pages) {
      if (endPage < pages - 1) {
        buttons.push(
          <li key="endEllipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      buttons.push(
        <li key={pages} className="page-item">
          <button className="page-link" onClick={() => setCurrentButton(pages)}>
            {pages}
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div className="clearfix mt-2">
      <div className="hint-text">
        Prikazuje se{" "}
        <b>
          {startIdx} - {endIdx}
        </b>{" "}
        od <b>{array.length}</b> unosa
      </div>
      <ul className="pagination justify-content-end">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Prethodna
          </button>
        </li>

        {renderPageButtons()}

        <li
          className={`${
            currentButton === pages ? "page-item disabled" : "page-item"
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setCurrentButton((next) => (next === pages ? next : next + 1))
            }
          >
            Sledeća
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
