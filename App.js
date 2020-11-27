import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import NavigatorScreen from "./screens/NavigatorScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterTreeScreen from "./screens/RegisterTreeScreen";

const navigator = createStackNavigator(
  {
    Navigator: NavigatorScreen,
    Welcome: WelcomeScreen,
    RegisterTree: RegisterTreeScreen,
  },
  {
    initialRoute: "Navigator",
    defaultNavigationOptions: {
      title: "PetTree",
    },
  }
);

export default createAppContainer(navigator);
