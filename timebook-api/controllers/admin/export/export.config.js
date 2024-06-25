const { formatPersonName } = require('../../../functions');
const boolToEmoji = require('./bool-to-emoji');

const colors = {
  defaultGreen: '109d58',
  darkerGreen: '0e904f',
  white: 'ffffff',
  black: '000000',
  borderGray: '198f55',
};

module.exports = {
  content: {
    workbookCreator: 'Chess Coders SRL',
    worksheetName: 'Lista activitati',
    totalWorked: 'Total Lucrat',
    activityHeaderNames: ['Data', 'Durata', 'Dezvoltator', 'Proiect', 'Activitate'],
  },
  colors,
  formats: {
    duration: '0.00#[$ ore]',
    date: 'dd mmm yyyy',
  },
  columnWidths: {
    default: 20,
    xs: 12.5,
    sm: 20,
    md: 30,
    xl: 70,
  },
  rowHeights: {
    default: 35,
  },
  fills: {
    titleRow: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: colors.defaultGreen },
    },
    tableHeadRow: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: colors.darkerGreen },
    },
  },
  fonts: {
    titleRow: {
      color: { argb: colors.white },
      size: 28,
      bold: true,
    },
    reportCell: {
      size: 16,
      color: { argb: colors.white },
      bold: true,
    },
    tableHeadRow: {
      color: { argb: colors.white },
      size: 18,
      bold: true,
    },
    activityRow: {
      size: 16,
      color: { argb: colors.black },
      bold: false,
    },
  },
  alignments: {
    left: {
      vertical: 'middle',
      horizontal: 'left',
    },
    right: {
      horizontal: 'right',
      vertical: 'middle',
    },
    center: {
      horizontal: 'center',
      vertical: 'middle',
    },
  },
  borders: {
    reportCell: {
      top: {
        style: 'thin',
        color: { argb: colors.borderGray },
      },
      left: {
        style: 'thin',
        color: { argb: colors.borderGray },
      },
      bottom: {
        style: 'thin',
        color: { argb: colors.borderGray },
      },
      right: {
        style: 'thin',
        color: { argb: colors.borderGray },
      },
    },
    activityHeaderCell: {
      // doesn't add top border because it creates visual impartity by 1px with G1:H2 cells
      left: {
        style: 'thin',
        color: { argb: colors.defaultGreen },
      },
      bottom: {
        style: 'thin',
        color: { argb: colors.defaultGreen },
      },
      right: {
        style: 'thin',
        color: { argb: colors.defaultGreen },
      },
    },
  },
  displayValues: {
    duration: (minutes) => Math.round((minutes / 60) * 100) / 100,
    user: (user) => formatPersonName(user),
    boolean: (bool) => {
      return boolToEmoji(bool);
    },
    date: (date) => new Date(date),
    project: (project) => project?.name,
    description: (description) => description,
  },
};
