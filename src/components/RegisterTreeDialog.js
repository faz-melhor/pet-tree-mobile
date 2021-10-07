import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "./forms";
import * as Yup from "yup";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import AppFormSwitch from "../components/forms/AppFormSwitch";
import AppActivityIndicator from "../components/AppActivityIndicator";
import DoneScreen from "../screens/DoneScreen";

const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("description"),
  specie: Yup.string().required().label("specie"),
  fruitful: Yup.boolean().required(),
  lat: Yup.number().required(),
  lng: Yup.number().required(),
});

const RegisterTreeDialog = ({ region, hideLocationPin, hideDialog }) => {

  const lat = region.latitude;
  const lng = region.longitude;

  const { user } = useAuth();
  const addTree = useApi(usersApi.addTree);

  const [error, setError] = React.useState();
  const [doneVisible, setDoneVisible] = React.useState(false);

  const handleSubmit = async (treeInfo) => {
    const result = await addTree.request(user.sub, treeInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.errors.detail);
      else {
        setError("Falha de comunicação com o servidor");
      }
      return;
    }
    setError(null);
    setDoneVisible(true);
  };

  const handleAfterDone = () => {
    setDoneVisible(false);
    hideDialog();
    hideLocationPin();
  };

  return (
    <View style={styles.defaultPosition}>
      <Provider>
        <View>
          <Portal>
            <Dialog visible={true} onDismiss={hideDialog}>
              <AppActivityIndicator visible={addTree.loading} />
              <DoneScreen onDone={handleAfterDone} visible={doneVisible} />
              <View style={styles.container}>
                <AppForm
                  initialValues={{
                    description: "",
                    specie: "",
                    fruitful: false,
                    lat: lat,
                    lng: lng,
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <ErrorMessage error={error} visible={error} />
                  <AppFormField
                    autoCorrect={false}
                    mode="outlined"
                    name="description"
                    placeholder="Descrição"
                    theme={{ colors: { primary: "#43a047", underlineColor: "transparent" } }}
                  />
                  <AppFormField
                    autoCorrect={false}
                    mode="outlined"
                    name="specie"
                    placeholder="Espécie"
                    theme={{ colors: { primary: "#43a047", underlineColor: "transparent" } }}
                  />
                  <View style={styles.switchContainer}>
                    <AppFormSwitch color="#43a047" style={styles.switchComponent} name="fruitful" />
                    <Text style={styles.switchLabel}> Frutífera</Text>
                  </View>
                  <SubmitButton title="Adicionar Árvore" />
                  <Button color="#43a047" onPress={hideDialog}>Cancelar</Button>
                </AppForm>
              </View>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  switchComponent: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  switchLabel: {
    fontSize: 20,
    textAlignVertical: "bottom",
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 10,
  },
  defaultPosition: {
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  greenButton: {
    marginVertical: 10,
    backgroundColor: "#43a047"
  }
});

export default RegisterTreeDialog;
