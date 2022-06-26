import * as XLSX from "xlsx";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { InventoryEntry, Parameter } from "../Entities/DataStorage";
import { addEntryToItemGroup, editItemGroupEntry, nextId } from "../redux/actions";

export async function importData(importedData, entries, dispatch) {
  const b64 = await FileSystem.readAsStringAsync(importedData.uri, { encoding: FileSystem.EncodingType.Base64 });
  const workbook = XLSX.read(b64, { type: "base64" });
  let ids = getIds(entries);

  let excelRowsObjArr = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Inventory"]);
  let parsedEntries = [];
  excelRowsObjArr.forEach((e) => parsedEntries.push(createEntryFromRow(e)));
  parsedEntries.forEach((e) => {
    if (ids.includes(e.id)) {
      console.log("edit " + e.name);
      dispatch(editItemGroupEntry(e.id, e));
    } else {
      console.log("add " + e.name);
      dispatch(nextId());
      dispatch(addEntryToItemGroup(e.id, e.name, e.parentIds, e.parameters, e.icon, e.image));
    }
  });
}

function createEntryFromRow(entryObj) {
  let parameters = [];
  let parCount = Math.floor((Object.keys(entryObj).length - 5) / 3);
  for (let i = 1; i <= parCount; i++) {
    let temp = new Parameter(
      entryObj["Parameter" + i + "Name"],
      entryObj["Parameter" + i + "Type"],
      entryObj["Parameter" + i + "Value"]
    );
    temp.id = i;
    parameters.push(temp);
  }
  let parentIds = entryObj["Parent ids"].split(",").map(Number);

  return new InventoryEntry(
    entryObj["Name"],
    entryObj["Id"],
    parentIds,
    parameters,
    entryObj["Icon"],
    entryObj["Image"]
  );
}

function getIds(entries) {
  let entriyList = getItemList(entries);
  return entriyList.map((e) => e.id);
}

export async function exportDataToExcel(data) {
  let header = ["Id", "Name", "Parent ids", "Icon", "Image"];
  let output = ["Header placeholder"];

  let mostParameters = 0;
  data.forEach((element) => {
    let temp = toArray(element);
    let parCount = Math.floor((temp.length - 5) / 3);
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

function toArray(element) {
  let temp = [element.id, element.name, element.parentIds.toString(), element.icon, element.image];
  element.parameters.forEach((p) => {
    temp.push(p.name);
    temp.push(p.type);
    temp.push(p.value);
  });
  return temp;
}

function getItemList(itemGroup) {
  let entries = [];
  for (let i = 0; i < itemGroup.length; i++) {
    entries = entries.concat(recurList(itemGroup[i]));
  }
  return entries;
}

function recurList(itemGroup) {
  let entries = itemGroup.data;

  for (let i = 0; i < itemGroup.subItemGroups.length; i++) {
    entries = entries.concat(recurList(itemGroup.subItemGroups[i]));
  }

  return entries;
}
