// Importer funktionen registerRootComponent fra Expo
import { registerRootComponent } from 'expo';

// Importer hovedapplikationen (App-komponenten)
import App from './App';

// registerRootComponent kalder AppRegistry.registerComponent('main', () => App);
// Dette sikrer, at appen bliver registreret som hovedkomponenten, uanset om den køres i Expo Go eller som en native app.
// Det sørger også for, at miljøet (environment) bliver korrekt opsat.
registerRootComponent(App);

