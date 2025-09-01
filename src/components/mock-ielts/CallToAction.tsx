import { Mail, Bell, Download } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Ready for Your IELTS Success
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be the first to know when our mock tests are available and start your journey to IELTS success
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Mail className="h-8 w-8 mb-4" />
              <h3 className="font-semibold mb-2">Email Updates</h3>
              <p className="text-sm opacity-80">Get notified via email</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Bell className="h-8 w-8 mb-4" />
              <h3 className="font-semibold mb-2">Notifications</h3>
              <p className="text-sm opacity-80">Browser notifications</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Download className="h-8 w-8 mb-4" />
              <h3 className="font-semibold mb-2">Study Materials</h3>
              <p className="text-sm opacity-80">Free resources available</p>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-6">
              Leave your email address to receive updates about our mock test launch and exclusive preparation tips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}