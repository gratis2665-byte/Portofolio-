/**
 * Google Sheets and Google Drive API Service
 */

export interface GoogleSpreadsheetItem {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface SheetMetadata {
  spreadsheetId: string;
  title: string;
  sheets: {
    sheetId: number;
    title: string;
    index: number;
    rowCount?: number;
    columnCount?: number;
  }[];
  spreadsheetUrl: string;
}

/**
 * List spreadsheets from user's Google Drive
 */
export async function listUserSpreadsheets(accessToken: string): Promise<GoogleSpreadsheetItem[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,modifiedTime,webViewLink)&orderBy=modifiedTime desc&pageSize=30`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal mengambil daftar spreadsheet (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Get spreadsheet details and sheets (tabs)
 */
export async function getSpreadsheetDetails(
  spreadsheetId: string,
  accessToken: string
): Promise<SheetMetadata> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title,properties.spreadsheetUrl,sheets.properties`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal mengambil metadata spreadsheet (${response.status})`);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    title: data.properties?.title || 'Spreadsheet Tanpa Judul',
    spreadsheetUrl: data.properties?.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    sheets: (data.sheets || []).map((s: any) => ({
      sheetId: s.properties?.sheetId || 0,
      title: s.properties?.title || 'Sheet1',
      index: s.properties?.index || 0,
      rowCount: s.properties?.gridProperties?.rowCount,
      columnCount: s.properties?.gridProperties?.columnCount,
    })),
  };
}

/**
 * Get values from a spreadsheet range
 */
export async function getSpreadsheetValues(
  spreadsheetId: string,
  range: string,
  accessToken: string
): Promise<string[][]> {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?valueRenderOption=FORMATTED_VALUE`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal mengambil data sel (${response.status})`);
  }

  const data = await response.json();
  return data.values || [];
}

/**
 * Append row(s) to a spreadsheet tab
 */
export async function appendRowToSheet(
  spreadsheetId: string,
  sheetName: string,
  rowValues: (string | number)[][],
  accessToken: string
): Promise<any> {
  const encodedRange = encodeURIComponent(`${sheetName}!A1`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: `${sheetName}!A1`,
      majorDimension: 'ROWS',
      values: rowValues,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal menambahkan baris ke sheet (${response.status})`);
  }

  return response.json();
}

/**
 * Update values in a specific range
 */
export async function updateSheetValues(
  spreadsheetId: string,
  range: string,
  values: (string | number)[][],
  accessToken: string
): Promise<any> {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal memperbarui sel (${response.status})`);
  }

  return response.json();
}

/**
 * Clear values in a range (requires user confirmation before calling!)
 */
export async function clearSheetValues(
  spreadsheetId: string,
  range: string,
  accessToken: string
): Promise<any> {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:clear`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal menghapus isi sel (${response.status})`);
  }

  return response.json();
}

/**
 * Create a new specialized Training Management Google Spreadsheet
 */
export async function createTrainingSpreadsheet(
  title: string,
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const defaultTitle = title || `Alfi IT Trainer - Training & Inquiries Hub (${new Date().getFullYear()})`;

  const url = 'https://sheets.googleapis.com/v4/spreadsheets';

  const body = {
    properties: {
      title: defaultTitle,
    },
    sheets: [
      {
        properties: {
          title: 'Inquiries Pelatihan',
          gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Tanggal & Waktu' } },
                  { userEnteredValue: { stringValue: 'Nama PIC' } },
                  { userEnteredValue: { stringValue: 'Email PIC' } },
                  { userEnteredValue: { stringValue: 'Perusahaan / Institusi' } },
                  { userEnteredValue: { stringValue: 'Topik Pelatihan' } },
                  { userEnteredValue: { stringValue: 'Format' } },
                  { userEnteredValue: { stringValue: 'Jumlah Peserta' } },
                  { userEnteredValue: { stringValue: 'Durasi' } },
                  { userEnteredValue: { stringValue: 'Pesan / Catatan' } },
                  { userEnteredValue: { stringValue: 'Status Follow Up' } },
                ],
              },
              {
                values: [
                  { userEnteredValue: { stringValue: new Date().toLocaleDateString('id-ID') } },
                  { userEnteredValue: { stringValue: 'Rian Sastrawan (Contoh)' } },
                  { userEnteredValue: { stringValue: 'rian@perusahaan.co.id' } },
                  { userEnteredValue: { stringValue: 'PT Inovasi Finansial Nusantara' } },
                  { userEnteredValue: { stringValue: 'Advanced Kubernetes & Cloud Native' } },
                  { userEnteredValue: { stringValue: 'Onsite Kantor Klien' } },
                  { userEnteredValue: { stringValue: '15 - 25 Orang' } },
                  { userEnteredValue: { stringValue: '3 Hari Intensif' } },
                  { userEnteredValue: { stringValue: 'Kebutuhan migrasi arsitektur monolitik ke EKS' } },
                  { userEnteredValue: { stringValue: 'Proposal Terkirim' } },
                ],
              },
            ],
          },
        ],
      },
      {
        properties: {
          title: 'Batch & Jadwal Kelas',
          gridProperties: { rowCount: 50, columnCount: 8, frozenRowCount: 1 },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Batch ID' } },
                  { userEnteredValue: { stringValue: 'Nama Program Pelatihan' } },
                  { userEnteredValue: { stringValue: 'Klien Korporasi / Batch' } },
                  { userEnteredValue: { stringValue: 'Periode Pelaksanaan' } },
                  { userEnteredValue: { stringValue: 'Format' } },
                  { userEnteredValue: { stringValue: 'Jumlah Peserta' } },
                  { userEnteredValue: { stringValue: 'Status' } },
                  { userEnteredValue: { stringValue: 'Link Repositori Lab' } },
                ],
              },
              {
                values: [
                  { userEnteredValue: { stringValue: 'BATCH-2025-01' } },
                  { userEnteredValue: { stringValue: 'Enterprise Microservices with Go & Kafka' } },
                  { userEnteredValue: { stringValue: 'Bank BUMN Regional' } },
                  { userEnteredValue: { stringValue: '10 - 14 Maret 2025' } },
                  { userEnteredValue: { stringValue: 'Hybrid (Online + Onsite)' } },
                  { userEnteredValue: { stringValue: '28 Orang' } },
                  { userEnteredValue: { stringValue: 'Selesai (CSAT 4.96/5)' } },
                  { userEnteredValue: { stringValue: 'https://github.com/alfi-trainer/go-kafka-lab' } },
                ],
              },
            ],
          },
        ],
      },
      {
        properties: {
          title: 'Peserta & Evaluasi',
          gridProperties: { rowCount: 100, columnCount: 7, frozenRowCount: 1 },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'No' } },
                  { userEnteredValue: { stringValue: 'Nama Peserta' } },
                  { userEnteredValue: { stringValue: 'Email' } },
                  { userEnteredValue: { stringValue: 'Perusahaan' } },
                  { userEnteredValue: { stringValue: 'Batch Pelatihan' } },
                  { userEnteredValue: { stringValue: 'Skor Pre-Test' } },
                  { userEnteredValue: { stringValue: 'Skor Post-Test' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal membuat Google Spreadsheet baru (${response.status})`);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}`,
  };
}
