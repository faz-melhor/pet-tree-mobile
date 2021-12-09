import Dialog from "react-native-dialog";
import React, { useState } from "react";

export function NewDistanceDialog({ setRadius, hideDialog }) {
  const [newRadius, setNewRadius] = useState("");

  const onSubmit = () => {
    setRadius(parseInt(newRadius) * 1000);
    hideDialog();
  };

  return (
    <Dialog.Container visible={true}>
      <Dialog.Title>New Distance</Dialog.Title>
      <Dialog.Description>Enter the distance in kilometers</Dialog.Description>
      <Dialog.Input
        keyboardType="numeric"
        onChangeText={(text) => setNewRadius(text)}
        value={newRadius}
      />
      <Dialog.Button label="Cancel" onPress={hideDialog} />
      <Dialog.Button label="Submit" onPress={onSubmit} />
    </Dialog.Container>
  );
}
