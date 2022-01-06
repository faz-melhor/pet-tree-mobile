import Dialog from "react-native-dialog";
import React from "react";

export default function WantToEditTreeDialog({
  hideDialog,
  showTreeInfoDialog,
}) {
  const onYes = () => {
    showTreeInfoDialog();
    hideDialog();
  };

  return (
    <Dialog.Container visible={true}>
      <Dialog.Title>Edit Tree Information</Dialog.Title>
      <Dialog.Description>
        Do you want to edit tree information?
      </Dialog.Description>
      <Dialog.Button label="No" onPress={hideDialog} />
      <Dialog.Button label="Yes" onPress={onYes} />
    </Dialog.Container>
  );
}
