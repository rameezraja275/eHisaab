// import React, { useState, useEffect } from "react";
// import Autocomplete from "react-native-autocomplete-input";
// import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

// import TextInput from "./TextInput";

// const AutoCompleteInput = ({ data, value, onChange }) => {
//   //   const [value, setQuery] = useState("");

//   const [filterData, setFilterData] = useState([]);

//   useEffect(() => {
//     const dataFilter =
//       value != ""
//         ? data.filter((product) =>
//             product.product_name.toUpperCase().includes(value.toUpperCase())
//           )
//         : [];
//     setFilterData(dataFilter);
//   }, [value]);

//   return (
//     <View>
//       <Autocomplete
//         inputContainerStyle={{
//           borderWidth: 0,
//         }}
//         renderTextInput={() => (
//           <TextInput
//             placeholder="Product Name"
//             onChange={(text) => onChange(text)}
//             required={true}
//           />
//         )}
//         keyExtractor={(i) => i.product_id}
//         data={filterData}
//         defaultValue={value}
//         renderItem={({ item, i }) => (
//           <TouchableOpacity
//             key={item.product_id}
//             onPress={(text) => onChange(text)}
//             style={{
//               paddingHorizontal: 5,
//             }}
//           >
//             <Text>{item.product_name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default AutoCompleteInput;
