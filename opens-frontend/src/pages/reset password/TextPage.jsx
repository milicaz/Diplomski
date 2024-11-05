const TextPage = () => {
  return (
    <section className="mail-success section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-12">
            <div className="success-inner">
              <h1>
                <i className="fa fa-envelope"></i>
                <span>Vaš e-mail je uspešno poslat!</span>
              </h1>
              <p>Proverite Vaš e-mail. Dobili ste link za promenu lozinke.</p>
              <p>
                Da biste koristili naše usluge molimo Vas da se{" "}
                <a href="/logovanje">ulogujete.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextPage;
