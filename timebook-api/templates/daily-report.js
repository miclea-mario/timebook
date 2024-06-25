module.exports = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
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
    <div style="margin: 0 auto; max-width: 800px; ">
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
      Raport zilnic de activitate
    </h1>

      <h2 style="color: #f4f4f4">Data: {{formattedDate}}</h2>
      <h3 style="color: #f4f4f4">Total ore lucrate: {{totalHoursWorked}} ore</h3>
      <h3 style="color: #f4f4f4">Raport în funcție de colaborator</h3>
      <ul style="list-style-type: '♟️';">
      {{#each collaborators}}
        <li>
          <strong style="color: #f4f4f4">{{collaborator}}</strong> <span style="color: #f4f4f4">(total ore lucrate de colaborator: {{totalDuration}} ore)</span>
          <ul style="list-style-type: '🏁';">
            {{#each projects}}
              <li style="color: #f4f4f4">{{projectName}}: {{duration}} ore</li>
            {{/each}}
          </ul>
        </li>
      {{/each}}
    </ul>


    <h3 style="color: #f4f4f4; padding-top:20px">Raport în funcție de proiect</h3>
    <ul style="list-style-type: '🏁';">
    {{#each projects}}
      <li>
        <strong style="color: #f4f4f4">{{projectName}}</strong> <span style="color: #f4f4f4">(total ore lucrate pe proiect: {{totalDuration}} ore)</span>
        <ul style="list-style-type: '♟️';">
          {{#each collaborators}}
            <li style="color: #f4f4f4">{{userFullName}}: {{duration}} ore</li>
          {{/each}}
        </ul>
      </li>
    {{/each}}
  </ul>

  <h3 style="color: #f4f4f4; padding-top:20px">Colaboratori cu activitate incompletă</h3>
  {{#if collaboratorsMissingActivityLength}}
  <ul style="list-style-type: '♟️';">
  {{#each collaboratorsMissingActivity}}
    <li>
      <strong style="color: #f4f4f4">{{userFullName}}</strong>: <span style="color: #FF3141"> {{difference}} ore</span>
    </li>
  {{/each}}
</ul>
{{else}}
  <p style="color: #f4f4f4">Toti colaboratorii au activitate completa.</p>
{{/if}}



        <h4 style="font-size:16px; color:#fff">
          <em style="color: #53b0ae; font-size:18px;">”În șah, la fel ca și în viață, fericirea de ieri poate fi otrava de astăzi.”</em>
          <br/>
          Adaptare după Assaic
        </h4>
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
          <div style="color: #363636; margin-right: 470px; white-space: nowrap; font-family: Arial, sans-serif; ">
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
