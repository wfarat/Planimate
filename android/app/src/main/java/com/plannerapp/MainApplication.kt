package com.plannerapp

import android.app.Application
import android.content.Context
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // add(MyReactNativePackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        Log.d("MainApplication", "onCreate called")
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
        Log.d("MainApplication", "Before initializing Flipper")
        initializeFlipper(this, reactNativeHost.reactInstanceManager)
        Log.d("MainApplication", "After initializing Flipper")
    }

    private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                Log.d("MainApplication", "Attempting to initialize Flipper")
                val className = "com.plannerapp.ReactNativeFlipper"
                val aClass = Class.forName(className)
                val method = aClass.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java)
                method.invoke(null, context, reactInstanceManager)
                Log.d("MainApplication", "Flipper initialized successfully")
            } catch (e: Exception) {
                Log.e("MainApplication", "Error initializing Flipper: ${e.message}")
                e.printStackTrace()
            }
        } else {
            Log.d("MainApplication", "Not in DEBUG mode, skipping Flipper initialization")
        }
    }
}
