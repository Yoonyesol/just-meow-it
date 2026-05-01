import React from "react";


export default function ShareSNS() {
    const shareTwitter = () => {
        const url = '';
        const text = "고양이의 조언으로 고민 해결하기"; // 전달할 텍스트
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
        )}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl);
    }

    function shareFacebook() {
        var sendUrl = "devpad.tistory.com/"; // 전달할 URL
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    }

    // function shareKakao() {

    //     // 사용할 앱의 JavaScript 키 설정
    //     Kakao.init('카카오에서_발급받은_API키');

    //     // 카카오링크 버튼 생성
    //     Kakao.Link.createDefaultButton({
    //         container: '#btnKakao', // 카카오공유버튼ID
    //         objectType: 'feed',
    //         content: {
    //             title: "개발새발", // 보여질 제목
    //             description: "개발새발 블로그입니다", // 보여질 설명
    //             imageUrl: "devpad.tistory.com/", // 콘텐츠 URL
    //             link: {
    //                 mobileWebUrl: "devpad.tistory.com/",
    //                 webUrl: "devpad.tistory.com/"
    //             }
    //         }
    //     });
    // }

    return (
        <div>
            <a id="btnTwitter" onClick={shareTwitter} />트위터
            <a id="btnFacebook" href="javascript:shareFacebook();" />페이스북
            <a id="btnKakao" href="javascript:shareKakao();" />카카오톡
        </div>
    )
}