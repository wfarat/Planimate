package com.plannerapp

import android.content.Context
import android.util.Log
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.android.utils.FlipperUtils
import com.facebook.flipper.core.FlipperClient
import com.facebook.flipper.plugins.inspector.DescriptorMapping
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.react.ReactInstanceManager
import com.facebook.react.modules.network.NetworkingModule
import okhttp3.OkHttpClient

class ReactNativeFlipper {
    companion object {
        @JvmStatic
        fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
            if (FlipperUtils.shouldEnableFlipper(context)) {
                Log.d("ReactNativeFlipper", "Enabling Flipper")
                val client: FlipperClient = AndroidFlipperClient.getInstance(context)

                val networkFlipperPlugin = NetworkFlipperPlugin()
                NetworkingModule.setCustomClientBuilder { builder: OkHttpClient.Builder ->
                    builder.addNetworkInterceptor(FlipperOkhttpInterceptor(networkFlipperPlugin))
                    Log.d("ReactNativeFlipper", "Network interceptor added")
                }

                client.addPlugin(networkFlipperPlugin)
                client.addPlugin(InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()))
                client.start()
                Log.d("ReactNativeFlipper", "Flipper client started")
            } else {
                Log.d("ReactNativeFlipper", "Flipper not enabled")
            }
        }
    }
}
