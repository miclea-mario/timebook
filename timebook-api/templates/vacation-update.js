module.exports = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #fff;
      color: #363636;
    "
  >
    <div style="margin: 0 auto; max-width: 800px">
      <header
        style="text-align: center; padding: 40px 0; background-color: #f4f4f4"
      >
        <img
          src="https://chesscoders.com/wp-content/uploads/2023/06/logo-w-text.png"
          alt=""
        />
      </header>
      <div style="padding: 36px 50px 42px 50px; background-color: #0f4c81">
        <h1 style="text-align: center; margin-bottom: 30px; color: #fff">
          Actualizare cerere de concediu
        </h1>
        <h3 style="color: #fff">Data cererii: {{requestDate}}</h3>
        <h3 style="color: #fff">Data actualizarii: {{updatedAt}}</h3>
        <p style="color: #fff">
          Dragă {{userName}},<br/><br/>
          Perioada concediului solicitat este:
        </p>
        <ul style="color: #fff">
          <li style="color: #fff">Data de început: {{startDate}}</li>
          <li style="color: #fff">Data de final: {{endDate}}</li>
        </ul>
        <p style="color: #fff">
        <br/>
        {{statusResponse}} {{adminName}}.
        </p>
        
        <h4 style="color: #fff">
          Nu uita,
          <em style="color: #53b0ae">”{{statusQuote}}”</em>
        </h4>

        <div
          style="
            margin-top: 40px;
            text-align: center;
            margin-top: 60px;
            margin-bottom: 15px;
          "
        >
          <a
            href="http://timebook.chesscoders.com/user/vacation-requests"
            target="_blank"
            style="
              padding: 15px 20%;
              background: #fff;
              text-decoration: none;
              color: #0f4c81;
            "
            >Vezi cererea</a
          >
        </div>
      </div>
      <footer style="background-color: #53b0ae">
        <div
          style="
            padding: 35px 8%;
            display: flex;
            align-items: center;
            position: relative;
          "
        >
          <div style="color: #363636; margin-right: 470px; white-space: nowrap">
            Copyright <br />
            &copy; {{year}} ChessCoders
          </div>
          <div style="display: flex; align-items: center; margin-top: 5px">
            <a
              href="https://timebook.chesscoders.com/"
              style="text-decoration: none"
            >
              <img
                src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Rectangle-List-icon.png"
                alt="timebook website"
                width="26"
                style="opacity: 0.7"
              />
            </a>
            <a href="https://chesscoders.com/" style="text-decoration: none">
              <img
                src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Globe-icon.png"
                alt="chesscoders website"
                width="24"
                style="opacity: 0.7; margin-left: 10px"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
