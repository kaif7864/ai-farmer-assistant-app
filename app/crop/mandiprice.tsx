import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const MarketDashboard: FC = () => {
  const [state, setState] = useState<string>("Uttrakhand");
  const [district, setDistrict] = useState<string>("Haridwar");
  const [market, setMarket] = useState<string>("Haridwar");
  const [commodity, setCommodity] = useState<string>("Rice");
  const [tableData, setTableData] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch last 7 days prices
  const fetchTableData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://10.70.24.226:8000/ai/mandi/price", {
        state,
        District: district,
        Market: market,
        Commodity: commodity,
      });

      const tableString = response.data.response;

      const rows = tableString
        .split("\n")
        .slice(2) // Skip header
        .map((row: string) => {
          const cols = row
            .split("|")
            .map((c: string) => c.trim())
            .filter((c: string) => c !== "");
          return {
            date: cols[0],
            state: cols[1],
            district: cols[2],
            market: cols[3],
            commodity: cols[4],
            min_price: cols[5],
            max_price: cols[6],
          };
        });

      setTableData(rows);
      setLoading(false);
    } catch (error) {
      console.error("Table fetch error:", error);
      setLoading(false);
    }
  };

  // Fetch 5-year graph data
  // const fetchGraphData = async () => {
  //   try {
  //     const response = await axios.post("http://10.214.222.226:8000/ai/mandi/price/graph", {
  //       state,
  //       District: district,
  //       Market: market,
  //       Commodity: commodity,
  //     });

  //     const jsonString = response.data.response.replace(/json|/g, "");
  //     const parsed = JSON.parse(jsonString);

  //     // Handle both possible keys ("Rice Data" OR "RiceData")
  //     const dataKey = `${commodity} Data`;
  //     const rawData = parsed[dataKey] || parsed[`${commodity}Data`] || [];

  //     // Map keys to simple names
  //     const processedData = rawData.map((item: any) => ({
  //       Year: item["Year"],
  //       AveragePrice: parseFloat(item["Average Price (₹)"]),
  //       ProfitLoss: parseFloat(item["Profit/Loss (₹ per ton)"]),
  //     }));

  //     setGraphData(processedData);
  //   } catch (error) {
  //     console.error("Graph fetch error:", error);
  //   }
  // };

  // Fetch data whenever inputs change
  useEffect(() => {
    fetchTableData();
    // fetchGraphData();
  }, [state, district, market, commodity]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌾 Market Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="District"
            value={district}
            onChangeText={setDistrict}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Market"
            value={market}
            onChangeText={setMarket}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Commodity"
            value={commodity}
            onChangeText={setCommodity}
            placeholderTextColor="#888"
          />
        </View>

        {/* Table Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Last 7 Days Prices</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#4caf50" />
          ) : tableData.length > 0 ? (
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Date</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>State</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>District</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Market</Text>
                <Text style={[styles.tableHeader, { flex: 1.5 }]}>Commodity</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Min Price (₹)</Text>
                <Text style={[styles.tableHeader, { flex: 1 }]}>Max Price (₹)</Text>
              </View>
              {/* Table Rows */}
              {tableData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.date}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.state}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.district}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.market}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.commodity}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.min_price}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{item.max_price}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No data available</Text>
          )}
        </View>

        {/* Graph Section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 5-Year Trend</Text>
          {graphData.length > 0 ? (
            <LineChart
              data={{
                labels: graphData.map((item) => item.Year.toString()),
                datasets: [
                  {
                    data: graphData.map((item) => item.AveragePrice),
                    color: () => `#82ca9d`,
                    strokeWidth: 2,
                  },
                  {
                    data: graphData.map((item) => item.ProfitLoss),
                    color: () => `#8884d8`,
                    strokeWidth: 2,
                  },
                ],
                legend: ["Average Price", "Profit/Loss"],
              }}
              width={Dimensions.get("window").width - 30}
              height={400}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <Text style={styles.noDataText}>No graph data available</Text>
          )}
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf4ea',
  },
  header: {
    backgroundColor: '#8bc34a',
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 50,
    alignItems: 'center',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textAlign: 'center',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MarketDashboard;