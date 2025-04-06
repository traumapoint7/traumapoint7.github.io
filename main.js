kakao.maps.load(() => {
  function useGPS() {
    if (!navigator.geolocation) {
      alert("GPS를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          document.getElementById("departure").value = result[0].address.address_name;
        } else {
          alert("주소 변환 실패");
        }
      });
    }, () => {
      alert("GPS 수신에 실패했습니다.");
    });
  }

  function calculateETA() {
    const keyword = document.getElementById("departure").value;
    if (!keyword) {
      alert("출발지를 입력하세요.");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const lat = place.y;
        const lng = place.x;
        document.getElementById("result").innerText =
          `✅ ${place.place_name} (좌표: ${lat}, ${lng})`;
      } else {
        document.getElementById("result").innerText = "❌ 장소를 찾을 수 없습니다.";
      }
    });
  }

  // 전역 함수 등록
  window.useGPS = useGPS;
  window.calculateETA = calculateETA;
});
