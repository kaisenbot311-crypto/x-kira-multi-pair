"use client";

import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import RealTimeStats from "./components/RealTimeStats";
import ServerButtons from "./components/ServerButtons";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AnimatedBackground />
      <CustomCursor />

      <div className="min-h-screen bg-background relative z-10">
        <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <div>
                <div className="font-semibold">x-kira</div>
                <div className="text-xs text-muted-foreground">Free WhatsApp Bot</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm hover:text-indigo-400 transition-colors">Features</a>
              <a href="#getting-started" className="text-sm hover:text-indigo-400 transition-colors">Get Started</a>
              <a href="#servers" className="ml-2 glow-button px-4 py-2 rounded-lg text-sm font-semibold">Pair Now</a>
            </nav>
          </div>
        </header>

        <main>
          <section className="relative py-20 lg:py-28">
            <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4">
                    <span className="text-sm text-indigo-300 uppercase font-medium">Free WhatsApp Bot</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Pair Your WhatsApp Bot —
                    <span className="block text-gradient">100% Free & Easy</span>
                  </h1>

                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                    x-kira Bot is a free WhatsApp bot that you can pair to your WhatsApp account in seconds. Get your pairing code, link it using WhatsApp's "Link a Device" feature, and start using powerful bot commands instantly.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a href="#servers" className="glow-button px-6 py-3 rounded-lg font-semibold">Get Pair Code</a>
                    <a href="#getting-started" className="secondary-button px-5 py-3 rounded-lg">How It Works</a>
                  </div>

                  <div className="flex gap-6 mt-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      <span>Active Users Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                      <span>100% Free Forever</span>
                    </div>
                  </div>
                </div>

                <div className="order-first lg:order-last">
                  <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-border rounded-2xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-4">How to Pair x-kira Bot</h3>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                      <li>Click "Get Pair Code" and enter your WhatsApp number (with country code, e.g., 917074029156)</li>
                      <li>Open WhatsApp → Three dots menu → Linked Devices → Link a Device</li>
                      <li>Enter the 8-digit pairing code you received</li>
                      <li>Your bot is now paired! Send <code className="px-2 py-1 bg-muted/50 rounded font-mono">.menu</code> to see all commands</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="servers" className="py-16 bg-gradient-to-b from-transparent to-indigo-900/10">
            <div className="container mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Choose a Pairing Server</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Select any available server to generate your pairing code. Each server shows how many users are currently connected to x-kira Bot.
                </p>
              </div>
              <ServerButtons />
            </div>
          </section>

          <section id="features" className="py-20 bg-background/50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-6">Why Use x-kira Bot?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-border bg-muted/5">
                  <h4 className="font-semibold mb-2">100% Free</h4>
                  <p className="text-sm text-muted-foreground">No subscriptions, no hidden fees. Completely free WhatsApp bot for everyone.</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-muted/5">
                  <h4 className="font-semibold mb-2">Easy Pairing</h4>
                  <p className="text-sm text-muted-foreground">Get your pairing code in seconds and link to WhatsApp using the built-in "Link a Device" feature.</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-muted/5">
                  <h4 className="font-semibold mb-2">Powerful Commands</h4>
                  <p className="text-sm text-muted-foreground">Access hundreds of bot commands for downloads, AI chat, group management, and more.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="getting-started" className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold mb-4">Pair x-kira Bot in 3 Simple Steps</h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">Follow these simple steps to pair x-kira Bot to your WhatsApp account. The entire process takes less than a minute!</p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border border-border rounded-xl">
                  <div className="text-3xl font-bold text-indigo-400">1</div>
                  <h4 className="font-semibold mt-2 mb-1">Get Your Pairing Code</h4>
                  <p className="text-sm text-muted-foreground">Choose a server and enter your WhatsApp number with country code to receive an 8-digit pairing code.</p>
                </div>
                <div className="p-6 border border-border rounded-xl">
                  <div className="text-3xl font-bold text-indigo-400">2</div>
                  <h4 className="font-semibold mt-2 mb-1">Link Your Device</h4>
                  <p className="text-sm text-muted-foreground">Open WhatsApp, go to Linked Devices, tap "Link a Device", and enter the pairing code.</p>
                </div>
                <div className="p-6 border border-border rounded-xl">
                  <div className="text-3xl font-bold text-indigo-400">3</div>
                  <h4 className="font-semibold mt-2 mb-1">Start Using the Bot</h4>
                  <p className="text-sm text-muted-foreground">Send .menu to see all available commands and start enjoying your free WhatsApp bot!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 border-t border-border">
            <div className="container mx-auto px-6">
              <RealTimeStats />
            </div>
          </section>
        </main>

        <footer className="border-t border-border py-10">
          <div className="container mx-auto px-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <div>
                <div className="font-semibold">x-kira Bot</div>
                <div className="text-xs">&copy; 2025 Free WhatsApp Bot</div>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="#features" className="hover:text-indigo-400">Features</a>
              <a href="https://github.com/sumon9836" className="hover:text-indigo-400">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
