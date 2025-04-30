import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Brand Story */}
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  THREADLINE
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  ThreadLine ra đời với sứ mệnh kết nối các nhà thiết kế thời trang và thợ may độc lập với khách hàng yêu thích thời trang cá nhân hóa. Nền tảng không chỉ đơn thuần là nơi mua bán, mà còn là không gian sáng tạo, giao lưu ý tưởng và hiện thực hóa mọi phong cách thời trang độc bản thông qua công nghệ và chatbot thông minh.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Triết Lý Kinh Doanh
                </h3>
                <p className="text-gray-600 leading-loose">
                  ThreadLine luôn đề cao sự sáng tạo, cá nhân hóa và tiện ích cho cả khách hàng lẫn các nhà thiết kế, thợ may. Chúng tôi cam kết mang lại trải nghiệm tối ưu, an toàn và minh bạch – nơi mọi ý tưởng thời trang đều được lắng nghe, hiện thực hóa một cách chuyên nghiệp và nhanh chóng. ThreadLine không chỉ là cầu nối, mà còn là người bạn đồng hành, hỗ trợ phát triển thương hiệu cá nhân và lan tỏa giá trị sáng tạo bền vững.
                </p>
              </div>
            </div>

            {/* Right Side - Vision and Values */}
            <div className="space-y-8">
              <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Tầm Nhìn
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Trở thành nền tảng thương mại điện tử hàng đầu dành cho thiết kế và may đo thời trang cá nhân hóa, giúp các nhà thiết kế và thợ may độc lập vươn tầm tiếp cận khách hàng, phát triển thương hiệu và đóng góp vào sự phát triển của ngành thời trang sáng tạo tại Việt Nam và quốc tế.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sứ Mệnh
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Mang lại giải pháp kết nối toàn diện giữa khách hàng và các nhà thiết kế, thợ may độc lập thông qua công nghệ hiện đại và chatbot hỗ trợ thông minh. ThreadLine giúp khách hàng dễ dàng đặt may, lựa chọn thiết kế riêng, đồng thời hỗ trợ các nhà thiết kế/thợ may xây dựng thương hiệu, quản lý đơn hàng và phát triển kinh doanh hiệu quả.
                </p>
              </div>

              <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Giá Trị Cốt Lõi</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    Cá nhân hóa: Sản phẩm thiết kế và may đo theo yêu cầu riêng biệt của từng khách hàng.
                  </li>
                  <li>
                    Sáng tạo: Không giới hạn ý tưởng, đa dạng mẫu mã và phong cách.
                  </li>
                  <li>
                    Tiện lợi: Đặt hàng, trao đổi, cập nhật tiến độ nhanh chóng với chatbot 24/7.
                  </li>
                  <li>
                    Kết nối: Tạo dựng cộng đồng sáng tạo, hợp tác và phát triển lâu dài.
                  </li>
                  <li>
                    Minh bạch & An toàn: Bảo mật thông tin, giao dịch rõ ràng, tin cậy.
                  </li>
                  <li>
                    Phát triển bền vững: Hỗ trợ các nhà thiết kế, thợ may độc lập nâng cao giá trị và phát triển thương hiệu.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link to="/shop">
              <button className="px-10 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 text-lg font-medium">
                Khám Phá Sản Phẩm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
