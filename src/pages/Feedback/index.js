export const Feedback = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Geri Bildirim</h1>
      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Konu</label>
            <input
              type="text"
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              placeholder="Geri bildirim konusu"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Mesajınız</label>
            <textarea
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              rows="4"
              placeholder="Mesajınızı yazın"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};
