import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MultiColumnsExample from "./components/multi-columns-example";
import SingleColumnWithSearchExample from "./components/single-column-with-search-example";
import { commonStyles } from "./styles/common";

const App = () => (
  <SafeAreaProvider style={commonStyles.safeArea}>
    <ScrollView
      contentContainerStyle={commonStyles.homeContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.homeHeader}>
        <Text style={commonStyles.homeTitle}>MultiColumn Modal Picker</Text>
        <Text style={commonStyles.homeSubtitle}>
          Explore the picker configurations.
        </Text>
      </View>
      <View style={commonStyles.buttonGroup}>
        <MultiColumnsExample />
        <SingleColumnWithSearchExample />
      </View>
    </ScrollView>
  </SafeAreaProvider>
);

export default App;
