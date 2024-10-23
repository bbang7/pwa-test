"use client";
import {
  sendPushNotification,
  // registerServiceWorker,
  requestNotificationPermission,
} from "@/_utils/serviceWorkerUtils";

import React, { useEffect } from "react";

const Test = () => {
  // 푸시 알림 테스트
  const clickPushHandler = () => {
    sendPushNotification("알림", "알림 가나요?");
  };
  useEffect(() => {
    // registerServiceWorker();
    requestNotificationPermission();
    // 직접 푸시 알림 테스트
    sendPushNotification("테스트 알림", "테스트 알림입니다.");
  }, []);

  return (
    <>
      <button onClick={clickPushHandler}>알림 보내기</button>
    </>
  );
};

export default Test;
