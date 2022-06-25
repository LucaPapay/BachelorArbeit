import * as XLSX from "xlsx";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

function toArray(element) {
  let temp = [element.id, element.name, element.parentIds.toString(), element.icon];
  element.parameters.forEach((p) => {
    temp.push(p.name);
    temp.push(p.type);
    temp.push(p.value);
  });
  return temp;
}

export async function exportDataToExcel(data) {
  let header = ["Id", "Name", "Parent ids", "Icon"];
  let output = ["Header placeholder"];

  let mostParameters = 0;
  data.forEach((element) => {
    let temp = toArray(element);
    let parCount = Math.floor((temp.length - 4) / 3);
    if (parCount > mostParameters) {
      mostParameters = parCount;
    }
    output.push(temp);
  });

  for (let i = 1; i <= mostParameters; i++) {
    header.push("Parameter" + i + "Name");
    header.push("Parameter" + i + "Type");
    header.push("Parameter" + i + "Value");
  }

  output[0] = header;

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet(output);
  XLSX.utils.book_append_sheet(wb, ws, "Inventory");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });

  const uri = FileSystem.cacheDirectory + "Inventory.xlsx";

  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(uri, {
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Inventory Export",
    UTI: "com.microsoft.excel.xlsx",
  });
}

async function openShareDialogAsync(uri) {
  await Sharing.shareAsync(uri);
}
