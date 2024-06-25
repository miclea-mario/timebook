const ExcelJS = require('exceljs');
const { Activity } = require('../../../models');
const { applyFiltersActivities, error } = require('../../../functions');

const { config, getExportFilename, getExportTitle, getExportTotals } = require('.');
const {
  alignments,
  borders,
  columnWidths,
  colors,
  content,
  displayValues,
  fills,
  fonts,
  formats,
  rowHeights,
} = config;

module.exports = async (req, res) => {
  // Getting activities list from DB
  const filters = applyFiltersActivities(req.body);
  const documents = await Activity.find(filters).select([
    'project',
    'user',
    'date',
    'description',
    'duration',
  ]);
  if (!documents.length) {
    throw error(400, 'No activities in the database');
  }
  // Creating Workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = content.workbookCreator;
  workbook.created = new Date();

  // Creating worksheet
  const sheet = workbook.addWorksheet(content.worksheetName, {
    properties: {
      tabColor: { argb: colors.defaultGreen },
      defaultColWidth: columnWidths.default,
      defaultRowHeight: rowHeights.default,
    },
    views: [
      {
        state: 'frozen',
        ySplit: 3,
      },
    ],
  });

  // Setting column widths
  sheet.getColumn(1).width = columnWidths.xs;
  sheet.getColumn(2).width = columnWidths.xs;
  sheet.getColumn(5).width = columnWidths.md;
  sheet.getColumn(6).width = columnWidths.md;
  sheet.getColumn(7).width = columnWidths.xl;

  /**
   * Top rows: worksheet title and activities totals
   */

  // Title rows styling
  sheet.mergeCells('A1:E2');
  const titleRows = [sheet.getRow(1), sheet.getRow(2)];
  titleRows.map((row) => {
    row.fill = fills.titleRow;
    row.font = fonts.titleRow;
    row.alignment = alignments.left;
  });

  // Worksheet title
  const titleCell = sheet.getCell('A1');
  titleCell.value = getExportTitle(req.body, documents[0]);

  // Worksheet short reports
  const reportCells = [sheet.getCell('H1'), sheet.getCell('H2')];
  reportCells.map((cell) => {
    cell.alignment = alignments.right;
    cell.font = fonts.reportCell;
    cell.border = borders.reportCell;
    cell.numFmt = formats.duration;
  });

  //
  const { totalWorked } = getExportTotals(documents);
  sheet.getCell('H1').value = content.totalWorked;
  sheet.getCell('H2').value = totalWorked;

  // Adding activity table head
  const tableHeadRow = sheet.getRow(3);
  tableHeadRow.fill = fills.tableHeadRow;
  tableHeadRow.font = fonts.tableHeadRow;
  tableHeadRow.alignment = alignments.left;

  const activityHeaderCells = [
    sheet.getCell('A3'),
    sheet.getCell('B3'),
    sheet.getCell('C3'),
    sheet.getCell('D3'),
    sheet.getCell('E3'),
  ];

  const { activityHeaderNames } = content;

  activityHeaderCells.map((cell, index) => {
    cell.border = borders.activityHeaderCell;
    cell.value = activityHeaderNames[index];
  });

  sheet.getCell('A3').alignment = alignments.center;
  sheet.getCell('B3').alignment = alignments.center;
  sheet.getCell('C3').alignment = alignments.right;
  sheet.getCell('D3').alignment = alignments.right;

  // Activity rows
  const startRow = 4;
  documents.map((activity, index) => {
    const currentRowIndex = startRow + index;
    const currentRow = sheet.getRow(currentRowIndex);
    currentRow.height = rowHeights.default;
    currentRow.font = fonts.activityRow;
    currentRow.alignment = alignments.left;

    const { date, duration, user, project, description } = activity;

    const dateCell = sheet.getCell('A' + currentRowIndex);
    dateCell.numFmt = formats.date;
    dateCell.alignment = alignments.right;
    dateCell.value = displayValues.date(date);

    const durationCell = sheet.getCell('B' + currentRowIndex);
    durationCell.numFmt = formats.duration;
    durationCell.alignment = alignments.right;
    durationCell.value = displayValues.duration(duration);

    const userCell = sheet.getCell('C' + currentRowIndex);
    userCell.alignment = alignments.left;
    userCell.value = displayValues.user(user);

    const projectCell = sheet.getCell('D' + currentRowIndex);
    projectCell.alignment = alignments.left;
    projectCell.value = displayValues.project(project);

    const descriptionCell = sheet.getCell('E' + currentRowIndex);
    descriptionCell.alignment = {
      vertical: 'middle',
      horizontal: 'left',
      wrapText: true,
    };
    descriptionCell.value = displayValues.description(description);
  });

  // Hide columns depending on project or user timesheet.
  const isUserTimesheet = !!req.body.userId;
  const isProjectTimesheet = !!req.body.projectId;
  if (isUserTimesheet) {
    sheet.getColumn('C').hidden = true;
  }

  if (isProjectTimesheet) {
    sheet.getColumn('D').hidden = true;
  }

  // sending the file
  const filename = getExportFilename(req.body, documents[0]);
  res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', 'application/octet-stream');

  await workbook.xlsx.write(res);
  res.end();
};
