package com.awesomeproject

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.awesomeproject.MainActivity
class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Ana aktiviteye yönlendir
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish() // Splash ekranı kapat
    }
}
