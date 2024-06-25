const {
  applyFiltersActivities,
  formatDuration,
  formatDate,
  formatPersonName,
  error,
} = require('../../functions');
const { Activity } = require('../../models');
const ExcelJS = require('exceljs');

module.exports = async (req, res) => {
  if (!req.query) {
    throw error(400, 'Must provide queries');
  }
  const filters = applyFiltersActivities(req.query);

  const documents = await Activity.find(filters).select([
    'project.name',
    'user',
    'date',
    'description',
    'duration',
  ]);

  if (!documents.length) {
    throw error(400, 'No activities in the database');
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook?.addWorksheet('Task List');

  const timesheetTitle = req.query.userId
    ? formatPersonName(documents[0].user)
    : documents[0].project.name;
  sheet.getCell('A1').font = {
    size: 64,
  };
  sheet.getCell('A1').value = timesheetTitle;

  // const stats = getStats(documents);

  //defining width and height
  sheet.properties.defaultColWidth = 10;
  sheet.properties.defaultRowHeight = 25;
  // sheet.properties.f
  sheet.pageSetup.fitToWidth = true;
  //column headers can only be applied on row 1 and will override everything
  //merge cells will override the values in the selected cells,so i can`t add a single row with all titles
  sheet.mergeCells('A1:F2');
  sheet.getCell('G1').value = 'Total Hours';
  const totalDuration = documents.reduce((acc, val) => acc + val.duration, 0);
  sheet.getCell('G2').value = totalDuration / 60;

  //setting custom widths
  sheet.getColumn('G').width = 18;
  // sheet.getColumn('H').width = 18;
  // sheet.getColumn('I').width = 18;
  sheet.getColumn('E').width = 20;
  sheet.getColumn('F').width = 40;

  //sheet.getRows(1,2) doesn`t work
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '2e9d58' },
  };
  sheet.getRow(2).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '2e9d58' },
  };

  const entityHeader = req.query.userId ? 'Project' : 'Developer';
  const headers = sheet.addRow(['Date', 'Hours', entityHeader, 'Task']);
  headers.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '238d49' },
  };

  await documents.map((obj) => {
    sheet.addRow([
      formatDate(obj.date),
      formatDuration(obj.duration),
      req.query.projectId ? formatPersonName(obj.user) : obj.project.name,
      obj.description,
    ]);
  });

  //Adding fonts,alignment and borders to headers
  let font = {
    size: 14,
    // bold: true,
    color: { argb: 'ffffff' },
  };
  const borders = {
    top: { style: 'thin', color: { argb: '666565' } },
    left: { style: 'thin', color: { argb: '666565' } },
    bottom: { style: 'thin', color: { argb: '666565' } },
    right: { style: 'thin', color: { argb: '666565' } },
  };
  let col = 'ABCDEFGHIJK';
  for (let i = 1; i < 4; i++) {
    sheet.getRow(i).font = font;
    for (let j = 0; j < col.length; j++) {
      sheet.getCell(col[j] + i).border = borders;
      sheet.getCell(col[j] + i).alignment = { vertical: 'middle' };
      if (j > 7) sheet.getCell(col[j] + i).alignment = { vertical: 'middle', horizontal: 'right' };
    }
  }

  sheet.getCell('A1').font = { ...font, size: 14 };
  sheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' };

  //Adds alignment,border and fonts to table
  const middle = { vertical: 'middle' };

  for (let i = 4; i < documents.length + 4; i++) {
    sheet.getRow(i).font = { ...font, color: { argb: '2d2e2e' }, size: 10 };
    for (let j = 0; j < col.length; j++) {
      if (col[j] == 'A' || col[j] == 'B') {
        sheet.getCell(col[j] + i).alignment = { ...middle, horizontal: 'center' };
      } else if (col[j] == 'F') sheet.getCell(col[j] + i).alignment = { ...middle };
      else sheet.getCell(col[j] + i).alignment = middle;
      sheet.getCell(col[j] + i).border = borders;
    }
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'Task List.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
