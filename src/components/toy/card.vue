<template>
  <div class="toy">
    <div class="levels">
      <div class="level one">
        <div class="title">第一步</div>
        <div class="content">添加意图</div>
      </div>
      <div class="level two">
        <div class="title">第二步</div>
        <div class="content">添加语义插槽</div>
      </div>
      <div class="level three">
        <div class="title">第三步</div>
        <div class="content">设置远程接口</div>
      </div>
      <div class="level four">
        <div class="title">第四步</div>
        <div class="content">开始聊天～！</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.levels {
  transform-style: preserve-3d;
  user-select: none;
}

.levels .level {
  width: 280px;
  height: 140px;
  border-radius: 12px;
  color: #ffc0cb;
  cursor: pointer;
  transition: all 0.4s ease;
  transform: rotateX(45deg) rotateY(-15deg) rotate(45deg);
  opacity: 0.9;
}


.levels .level:first-child {
  margin-top: 70px;
  background-color: #8063e1;
  background-image: linear-gradient(135deg, #bd7be8, #8063e1);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px #8063e1;
  z-index: 4;
}

.levels .level:nth-child(2) {
  margin-top: -70px;
  background-color: #3f58e3;
  background-image: linear-gradient(135deg, #7f94fc, #3f58e3);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px #3f58e3;
  z-index: 3;
}

.levels .level:nth-child(3){
  margin-top: -70px;
  background-color: #2c6fd1;
  background-image: linear-gradient(135deg, #21bbfe, #2c6fd1);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px #2c6fd1;
  z-index: 2;
}

.levels .level:nth-child(4) {
  margin-top: -70px;
  margin-bottom: 70px;
  background-color: #352f64;
  background-image: linear-gradient(135deg, #415197, #352f64);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px #352f64;
  z-index: 4;
}

.levels .level .title {
  top: 28px;
  left: 15px;
  font-size: 26px;
  font-weight: bold;
}

.levels .level .content {
  font-weight: 700;
  bottom: 15px;
  left: 15px;
  font-size: 16px;
}

.levels .level:hover {
  transform: rotateX(30deg) rotateY(-15deg) rotate(10deg) translate(-25px, 50px);
  opacity: 0.8;
  color: white;
}

.levels .level:hover:after {
  transform: translateX(100%);
  transition: all 1.2s ease-in-out;
}

.levels .level::after {
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background-image: linear-gradient(60deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 80%);
}
</style>