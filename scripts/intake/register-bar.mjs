/** 기존 바 전용 명령을 공통 등록기로 연결하는 호환 래퍼. */
process.env.INTAKE_DEFAULT_CATEGORY = "bar";
await import("./register.mjs");
