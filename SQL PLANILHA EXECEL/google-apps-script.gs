const SHEET_NAME = "Biblioteca";

function doGet(e) {
  const params = e.parameter || {};
  const callback = params.callback || "";
  let data;

  if (params.action === "save") {
    data = saveInfo(params);
  } else if (params.action === "delete") {
    data = deleteInfo(params);
  } else {
    data = {
      ok: true,
      items: listInfo(params)
    };
  }

  return output(data, callback);
}

function saveInfo(params) {
  const sheet = getSheet();

  sheet.appendRow([
    new Date(),
    params.titulo || "",
    params.categoria || "Geral",
    params.conteudo || ""
  ]);

  return {
    ok: true,
    message: "Informacao salva"
  };
}

function deleteInfo(params) {
  const sheet = getSheet();
  const row = Number(params.row);

  if (row && row > 1 && row <= sheet.getLastRow()) {
    sheet.deleteRow(row);

    return {
      ok: true,
      message: "Informacao excluida"
    };
  }

  const rows = sheet.getDataRange().getValues();
  const title = normalize(params.titulo || "");
  const category = normalize(params.categoria || "");
  const content = normalize(params.conteudo || "");

  for (let i = rows.length - 1; i >= 1; i--) {
    const sameTitle = normalize(rows[i][1] || "") === title;
    const sameCategory = normalize(rows[i][2] || "") === category;
    const sameContent = normalize(rows[i][3] || "") === content;

    if (sameTitle && sameCategory && sameContent) {
      sheet.deleteRow(i + 1);

      return {
        ok: true,
        message: "Informacao excluida"
      };
    }
  }

  if (!row || row <= 1 || row > sheet.getLastRow()) {
    return {
      ok: false,
      message: "Informacao nao encontrada"
    };
  }
}

function listInfo(params) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const query = normalize(params.q || "");
  const category = normalize(params.categoria || "");
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    const item = {
      row: i + 1,
      data: rows[i][0],
      titulo: rows[i][1],
      categoria: rows[i][2],
      conteudo: rows[i][3]
    };

    const text = normalize(item.titulo + " " + item.categoria + " " + item.conteudo);

    if (query && !text.includes(query)) continue;
    if (category && normalize(item.categoria) !== category) continue;

    items.push(item);
  }

  return items.reverse();
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Data", "Titulo", "Categoria", "Conteudo"]);
  }

  return sheet;
}

function output(data, callback) {
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify(data) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
