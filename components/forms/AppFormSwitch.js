import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { Switch } from "react-native-paper";

import ErrorMessage from "./ErrorMessage";

const AppFormSwitch = ({ name, width, ...otherprops }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <Switch
        style={styles.item}
        value={values[name]}
        onValueChange={(value) => setFieldValue(name, value)}
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

export default AppFormSwitch;
