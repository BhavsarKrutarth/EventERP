using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;

namespace EventERP.CommonComponents
{
    public class GenrateNodeFromExcelFile
    {
        public static DataTable GenrateNodeFromExcel(string FilePath)
        {
            string InputXml = string.Empty;
            string Extension = string.Empty;
            string ResponseMessage = string.Empty;
            string conStr = string.Empty;

            Extension = Path.GetExtension(FilePath);
            FilePath = HttpContext.Current.Server.MapPath(FilePath);



            switch (Extension)
            {
                case ".xls": //Excel 97-03
                    conStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;

                case ".xlsb": //Excel Binary WorkBook.
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=YES;IMEX=2'";
                    break;

                case ".xlsx": //Excel 07
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;
            }

            conStr = String.Format(conStr, FilePath);
            OleDbConnection connExcel = new OleDbConnection(conStr);
            OleDbCommand cmdExcel = new OleDbCommand();
            OleDbDataAdapter oda = new OleDbDataAdapter();
            DataTable dt = new DataTable();
            cmdExcel.Connection = connExcel;

            //Get the name of First Sheet
            connExcel.Open();
            DataTable dtExcelSchema;
            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            string SheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
            connExcel.Close();

            //Read Data from First Sheet
            connExcel.Open();
            cmdExcel.CommandText = "SELECT * From [" + SheetName + "]";
            oda.SelectCommand = cmdExcel;
            oda.Fill(dt);
            connExcel.Close();

            return dt;

        }

        public static DataTable GenrateNodeFromExcel_With_SheetName(string FilePath, string SheetName)
        {
            string InputXml = string.Empty;
            string Extension = string.Empty;
            string ResponseMessage = string.Empty;
            string conStr = string.Empty;

            Extension = Path.GetExtension(FilePath);
            FilePath = HttpContext.Current.Server.MapPath(FilePath);

            switch (Extension)
            {
                case ".xls": //Excel 97-03
                    conStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;

                case ".xlsb": //Excel Binary WorkBook.
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=YES;IMEX=2'";
                    break;

                case ".xlsx": //Excel 07
                    conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=2'";
                    break;
            }


            conStr = String.Format(conStr, FilePath);
            OleDbConnection connExcel = new OleDbConnection(conStr);
            OleDbCommand cmdExcel = new OleDbCommand();
            OleDbDataAdapter oda = new OleDbDataAdapter();
            DataTable dt = new DataTable();
            cmdExcel.Connection = connExcel;

            //Get the name of First Sheet
            connExcel.Open();
            DataTable dtExcelSchema;
            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            // string SheetName1 = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
            connExcel.Close();

            //Read Data from First Sheet
            connExcel.Open();
            cmdExcel.CommandText = "SELECT * From [" + SheetName + "]";
            oda.SelectCommand = cmdExcel;
            oda.Fill(dt);
            connExcel.Close();

            return dt;

        }

        public static DataTable GetDataTableFromCsv(string FilePath)
        {
            string header = "Yes";
            //sisFirstRowHeader ? "Yes" : "No";

            string pathOnly = Path.GetDirectoryName(FilePath);
            string fileName = Path.GetFileName(FilePath);

            string sql = @"SELECT * FROM [" + fileName + "]";

            using (OleDbConnection connection = new OleDbConnection(
                      @"Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + pathOnly +
                      ";Extended Properties=\"Text;HDR=" + header + "\""))
            using (OleDbCommand command = new OleDbCommand(sql, connection))
            using (OleDbDataAdapter adapter = new OleDbDataAdapter(command))
            {
                DataTable dataTable = new DataTable();
                dataTable.Locale = CultureInfo.CurrentCulture;
                adapter.Fill(dataTable);

                return dataTable;
            }
        }
        public static DataTable GetDataTableRowFromCsv(string FilePath)
        {
            StreamReader sr = new StreamReader(FilePath);
            string line = sr.ReadLine();
            string[] value = line.Split(',');
            DataTable dt = new DataTable();
            DataRow row;

            foreach (string dc in value)
            {
                dt.Columns.Add(new DataColumn(dc));
            }

            while (!sr.EndOfStream)
            {
                value = sr.ReadLine().Split(',');
                if (value.Length == dt.Columns.Count)
                {
                    row = dt.NewRow();
                    row.ItemArray = value;
                    dt.Rows.Add(row);
                }
            }
            sr.Close();
            return dt;
        }
    }
}