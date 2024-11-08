import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
import './Policy.scss';
import HomeFooter from '../../HomePage/Section/HomeFooter';
class Policy extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {


    }

    handleOnClickSpecialty = (clinic) => {
        this.props.history.push(`/clinic-detail/${clinic.id}`)
    }

    render() {

        return (
            <>

                <HomeHeader isShowBanner={false} />
                <div className='policy-container'>
                    <div className='policy-content'>

                        <p><strong>GIỚI THIỆU</strong></p>
                        <p>Chúng tôi, Công ty CP Công nghệ BookingCare, đơn vị sở hữu và vận hành “Nền tảng Y tế Chăm sóc sức khỏe toàn diện BookingCare” bao gồm hệ thống website và các ứng dụng di động. BookingCare cung cấp nền tảng công nghệ để bệnh nhân thuận tiện trong việc đặt lịch dịch vụ y tế với bác sĩ và cơ sở y tế. Bằng việc truy cập hoặc sử dụng dịch vụ của BookingCare, bạn hoàn toàn đồng ý theo các điều khoản, điều kiện dưới đây.</p>
                        <p>Chúng tôi duy trì quyền thay đổi hoặc điều chỉnh bất kỳ điều khoản và điều kiện nào dưới đây. Mọi sửa đổi nếu có sẽ có hiệu lực ngay lập tức sau khi đăng tải trên hệ thống trang này.</p>
                        <p><strong>SỬ DỤNG BOOKINGCARE</strong></p>
                        <p>Thông tin người cung cấp dịch vụ “Khám chữa bệnh”</p>
                        <p>Hệ thống BookingCare đăng tải thông tin và lịch khám của bác sỹ, dịch vụ y tế và cơ sở y tế. Các thông tin về bác sĩ, dịch vụ y tế, cơ sở y tế (gọi chung là “Người cung cấp dịch vụ Khám chữa bệnh”) được cung cấp bởi chính “Người cung cấp dịch vụ Khám chữa bệnh” và các nguồn thông tin tin cậy khác do chúng tôi lựa chọn biên tập.</p>
                        <p>Chúng tôi cố gắng tìm hiểu và lựa chọn thông tin chính xác để đăng tải trên hệ thống. Tuy nhiên, chúng tôi không đủ điều kiện xác minh sự chính xác tuyệt đối của thông tin đã đăng tải.</p>
                        <p><strong>Dịch vụ đặt lịch khám trực tuyến</strong></p>
                        <p>BookingCare cung cấp nền tảng công nghệ, phương tiện để kết nối bệnh nhân và bác sĩ, cơ sở y tế. Qua đó cung cấp dịch vụ đặt lịch khám trực tuyến.</p>
                        <p>Bệnh nhân lựa chọn bác sĩ, dịch vụ hoặc cơ sở y tế phù hợp trên hệ thống BookingCare để đặt lịch khám. BookingCare không phải là người cung cấp dịch vụ y tế và cũng không đại diện cho bất kỳ “Người cung cấp dịch vụ khám chữa bệnh” nào. Vai trò duy nhất của chúng tôi là tạo ra các công cụ, phương tiện để cung cấp “dịch vụ đặt lịch khám trực tuyến”.</p>
                        <p>Nhằm hỗ trợ việc đặt lịch khám hiệu quả cao, chúng tôi có thể kết nối thêm với người có nhu cầu đặt lịch thông qua ứng dụng (Apps),tin nhắn SMS, email, dịch vụ OTT và cuộc gọi thoại.</p>
                        <p><em><strong>Sai lệch thời gian &amp; hủy lịch khám</strong></em></p>
                        <p>Lịch hẹn khám qua hệ thống BookingCare và thời gian khám thực tế có thể sai khác so với lịch hẹn ban đầu do đặc thù của hoạt động khám chữa bệnh. Chúng tôi cố gắng để giảm thiểu sự sai lệch về thời gian và giảm thiểu thời gian chờ đợi của người bệnh.</p>
                        <p>Lịch hẹn khám có thể bị hủy hoặc thay đổi đột xuất vì một lý do nào đó, ví dụ như bác sĩ có công việc đột xuất. Việc này vẫn thỉnh thoảng xảy ra, nhất là với các bác sĩ, chuyên gia giỏi rất bận rộn. Chúng tôi sẽ thông báo sự thay đổi đó trong thời gian sớm nhất bằng một hoặc đồng thời các ứng dụng tin nhắn SMS, Push, email, dịch vụ OTT và cuộc gọi thoại.</p>
                        <p>Tuy nhiên, vì một lý do nào đó, chẳng hạn như lỗi đường truyền hoặc sai lệch thông tin, bạn có thể không nhận được thông báo kịp thời. Trong trường hợp này, BookingCare mong nhận được thông tin từ người bệnh để chúng tôi có thể sắp xếp lịch khám bổ sung phù hợp với yêu cầu của bạn.</p>
                        <p><em><strong>Phí dịch vụ đặt lịch</strong></em></p>
                        <p>Thời điểm hiện tại, BookingCare cung cấp dịch vụ đặt lịch khám trực tuyến hoàn toàn miễn phí đối với người bệnh khi đặt lịch khám thông qua BookingCare.</p>
                        <p>Trong một số trường hợp, bệnh nhân còn nhận được ưu đãi chi phí khám chữa bệnh khi đặt qua hệ thống.</p>
                        <p>Chính sách hoàn trả chi phí dịch vụ &quot;Bác sĩ từ xa&quot;</p>
                        <p>1.Trường hợp bác sĩ từ chối nhận khám (tình trạng bệnh không phù hợp khám từ xa/ không đúng chuyên môn của bác sĩ): Bệnh nhân được hoàn 100% chi phí.</p>
                        <ol start="2">
                            <li>Trường hợp bệnh nhân chủ động yêu cầu hủy lịch:</li>
                        </ol>
                        <p>Yêu cầu hủy lịch&lt;1 giờ trước giờ hẹn: Phí hủy lịch là 50%
                            Yêu cầu hủy lịch&gt;1 giờ trước giờ hẹn: bệnh nhân được hoàn 100% chi phí</p>
                        <ol start="3">
                            <li>Chi phí sẽ được hoàn lại trong vòng 5 – 7 ngày (không tính thứ 7, Chủ Nhật)</li>
                        </ol>
                        <p>Trường hợp bệnh nhân Cấp cứu</p>
                        <p>BookingCare KHÔNG phù hợp trong các trường hợp bệnh nhân cấp cứu. Nếu gặp trường hợp khẩn cấp chúng tôi khuyên bạn (hoặc người thân) không nên sử dụng dịch vụ đặt lịch khám BookingCare.</p>
                        <p>Bạn nên gọi số cấp cứu y tế 115 hoặc đến cơ sở y tế gần nhất để được thăm khám.</p>
                        <p>Quyền miễn trừ</p>
                        <p>BookingCare cung cấp “dịch vụ đặt lịch khám”, chúng tôi không cung cấp dịch vụ y tế và không đại diện cho bất kỳ “Người cung cấp dịch vụ khám chữa bệnh” nào. Chúng tôi không chịu trách nhiệm về chất lượng, hiệu quả khám chữa bệnh, chi phí, giá cả dịch vụ mà bạn nhận được từ “Người cung cấp dịch vụ khám chữa bệnh”.</p>
                        <p>Chúng tôi cũng không chịu trách nhiệm pháp lý liên quan đến hoạt động khám chữa bệnh của “người cung cấp dịch vụ khám chữa bệnh”.</p>
                        <p>Giới hạn trách nhiệm pháp lý</p>
                        <p>Chúng tôi chịu trách nhiệm pháp lý về những gì không thể bị loại trừ theo quy định của pháp luật Việt Nam.</p>
                        <p>Những phát sinh (nếu có) liên quan tới việc sử dụng dịch vụ đặt lịch khám BookingCare sẽ được hỗ trợ như mục “vai trò của BookingCare”</p>
                        <p><strong>Vai trò của BookingCare</strong></p>
                        <p>Hỗ trợ trước, trong và sau khi đi khám</p>
                        <p>Trước khám</p>
                        <p>Nhắc lịch khám, dặn dò chuẩn bị trước khám
                            Hướng dẫn đi lại, qui trình làm thủ tục khám
                            Trong khi khám</p>
                        <p>Hỗ trợ giải quyết các vướng mắc trong khi khám
                            Hỗ trợ người bệnh những yêu cầu nảy sinh
                            Sau khi khám</p>
                        <p>Ghi nhận ý kiến của bệnh nhân sau khám
                            Hỗ trợ giải đáp, làm rõ những vấn đề chuyên môn (nếu có yêu cầu)
                            Hỗ trợ quyền lợi của bệnh nhân sau khi đi khám (nếu có yêu cầu)
                            Hỗ trợ khám lại miễn phí</p>
                        <p>Sau khi đi khám, nếu người bệnh không hài lòng với qui trình khám, tư vấn và phương án điều trị của bác sĩ, hệ thống sẽ hỗ trợ bệnh nhân gặp lại bác sĩ để được khám và tư vấn kỹ hơn nếu yêu cầu đó của bệnh nhân được chúng tôi đánh giá là chính đáng, phù hợp.
                            Bệnh nhân được hỗ trợ khám miễn phí (không bao gồm chi phí xét nghiệm và thuốc) với bác sĩ khác cùng chuyên khoa nếu chúng tôi nhận thấy rằng yêu cầu của bệnh nhân là chính đáng, phù hợp.
                            Tuy nhiên, chúng tôi có quyền từ chối yêu cầu hỗ trợ khám lại miễn phí của bệnh nhân, nếu chúng tôi nhận thấy rằng yêu cầu đó là không phù hợp hoặc không chính đáng.</p>
                        <p><strong>Thông báo</strong></p>
                        <p>Chúng tôi sẽ gửi cho bạn thông báo qua ứng dụng (Apps),tin nhắn SMS, email, dịch vụ OTT, gọi điện thoại để thông báo cho bạn về vấn đề mà bạn có thể quan tâm. Bạn có thể bỏ đăng ký bằng cách liên hệ với chúng tôi hoặc bằng cách sử dụng lựa chọn hủy bỏ đăng ký trong các bản cập nhật email, tin nhắn, hoặc từ chối thông tin mà chúng tôi gửi cho bạn.</p>
                        <p>Khiếu nại</p>
                        <p>Nhằm không ngừng nâng cao chất lượng dịch vụ và trải nghiệm tốt hơn cho người dùng, chúng tôi mong nhận được những ý kiến phản hồi hoặc khiếu nại về chất lượng dịch vụ.</p>
                        <p><strong>Xin vui lòng liên hệ:</strong></p>
                        <p>Công ty Cổ phần Công nghệ BookingCare</p>
                        <p>ĐKKD số: 0106790291, Sở  KH-ĐT Hà Nội cấp ngày: 16/03/2015</p>
                        <p>Địa chỉ: Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                        <p><em>Tel: 024.7301.2468</em></p>


                    </div>
                </div>

                <HomeFooter></HomeFooter>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Policy));
