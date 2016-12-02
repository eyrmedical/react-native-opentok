package io.callstack.react.opentok;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

import javax.annotation.Nullable;

public class PublisherViewManager extends SessionViewManager<PublisherView> {

  public static final int COMMAND_CYCLE_CAMERA = 1;
  public static final int COMMAND_DESTROY = 2;
  public static final int COMMAND_MUTE = 3;
  public static final int COMMAND_UNMUTE = 4;

  @Override
  public String getName() {
    return "RCTOpenTokPublisherView";
  }

  @Override
  protected PublisherView createViewInstance(ThemedReactContext reactContext) {
    return new PublisherView(reactContext);
  }

  @Override
  public Map<String,Integer> getCommandsMap() {
    return MapBuilder.of(
      "cycleCamera", COMMAND_CYCLE_CAMERA,
      "destroy", COMMAND_DESTROY,
      "mute", COMMAND_MUTE,
      "unmute", COMMAND_UNMUTE
    );
  }

  @Override
  public void receiveCommand(
    PublisherView view,
    int commandType,
    @Nullable ReadableArray args
  ) {
    Assertions.assertNotNull(view);
    Assertions.assertNotNull(args);
    switch (commandType) {
      case COMMAND_CYCLE_CAMERA: {
        view.cycleCamera();
        return;
      }

      case COMMAND_DESTROY: {
        view.destroy();
        return;
      }

      case COMMAND_MUTE: {
        view.mute();
        return;
      }

      case COMMAND_UNMUTE: {
        view.unmute();
        return;
      }

      default:
        throw new IllegalArgumentException(String.format(
          "Unsupported command %d received by %s.",
          commandType,
          getClass().getSimpleName()
        ));
    }
  }
}
