/**
 * @OnlyCurrentDoc  Limite l'autorisation à cette seule Google Sheet.
 */

// Backend minimal : stocke les inscriptions dans la Google Sheet à laquelle ce script est rattaché.
// Colonnes : Date | Bateau | Personnes | Amène

function feuille_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(["Date", "Bateau", "Personnes", "Amène"]);
  return sheet;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const lignes = feuille_().getDataRange().getValues().slice(1);
  return json_(lignes.map(([, bateau, personnes, amene]) => ({ bateau, personnes, amene })));
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const bateau = String(d.bateau || "").trim().slice(0, 80);
    const amene = String(d.amene || "").trim().slice(0, 500);
    const personnes = Math.max(1, Math.min(30, parseInt(d.personnes, 10) || 1));
    if (!bateau || !amene) return json_({ ok: false, error: "Champs manquants" });
    // Préfixe ' pour empêcher l'interprétation comme formule dans la Sheet
    feuille_().appendRow([new Date(), "'" + bateau, personnes, "'" + amene]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
