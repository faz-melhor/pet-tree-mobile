import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";

import ErrorMessage from "./ErrorMessage";

const AppFormField = ({ name, width, ...otherprops }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <TextInput
        style={styles.item}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherprops}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
  },
});

export default AppFormField;
