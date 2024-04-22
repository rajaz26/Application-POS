
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @aws-amplify/react-native
import com.amazonaws.amplify.rtncore.AmplifyRTNCorePackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// react-native-bluetooth-escpos-printer
import cn.jystudio.bluetooth.RNBluetoothEscposPrinterPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-haptic-feedback
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-sound-player
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-torch
import com.cubicphuse.RCTTorch.RCTTorchPackage;
// react-native-track-player
import com.doublesymmetry.trackplayer.TrackPlayer;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-view-shot
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// react-native-vision-camera
import com.mrousavy.camera.CameraPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;
// vision-camera-code-scanner
import com.visioncameracodescanner.VisionCameraCodeScannerPluginPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AmplifyRTNCorePackage(),
      new AsyncStoragePackage(),
      new NetInfoPackage(),
      new RNCMaskedViewPackage(),
      new RNCPickerPackage(),
      new RNBluetoothEscposPrinterPackage(),
      new RNCameraPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new RNReactNativeHapticFeedbackPackage(),
      new ImagePickerPackage(),
      new LinearGradientPackage(),
      new PagerViewPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new RNSoundPackage(),
      new RNSoundPlayerPackage(),
      new SvgPackage(),
      new RCTTorchPackage(),
      new TrackPlayer(),
      new VectorIconsPackage(),
      new RNViewShotPackage(),
      new CameraPackage(),
      new RNFetchBlobPackage(),
      new VisionCameraCodeScannerPluginPackage()
    ));
  }
}
