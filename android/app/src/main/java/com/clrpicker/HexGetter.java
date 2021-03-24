package com.clrpicker; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;


public class HexGetter extends ReactContextBaseJavaModule {

    @Override
    public String getName() {
        return "HexGetter";
    }
   HexGetter(ReactApplicationContext context) {
       super(context);
   }
   @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("HexGetter", "Create event called with name: " + name
        + " and location: " + location);
    }


   
}

// add to CalendarModule.java
