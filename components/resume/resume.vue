<script setup>
// 此组件依赖全局注册的 FontAwesomeIcon 组件
// 确保在 VitePress 主题入口已添加所需图标库（fa-brands, fa-solid, fas, far 等）
</script>

<template>
  <div class="resume-container">
    <div class="resume-header">
      <div class="bg">
        <section aria-labelledby="skills-heading" class="skill-tags">
          <h2 id="skills-heading" class="visually-hidden">技能标签</h2>
          <ul>
            <li>
              <FontAwesomeIcon
                icon="fa-brands fa-html5"
                color="#ffd43a"
                aria-hidden="true"
              />
              HTML5
            </li>
            <li>
              <FontAwesomeIcon
                icon="fa-brands fa-vuejs"
                color="#ffd43a"
                aria-hidden="true"
              />
              Vue
            </li>
            <li>
              <FontAwesomeIcon
                icon="fa-brands fa-java"
                color="#ffd43a"
                aria-hidden="true"
              />
              JAVA
            </li>
            <li>
              <FontAwesomeIcon
                icon="fa-brands fa-sass"
                color="#ffd43a"
                aria-hidden="true"
              />
              SASS
            </li>
            <li>
              <FontAwesomeIcon
                icon="fa-brands fa-git"
                color="#ffd43a"
                aria-hidden="true"
              />
              GIT
            </li>
          </ul>
        </section>
      </div>
      <div class="person-card">
        <div class="person-head-img">
          <!-- 头像图片，取消注释并替换为实际图片路径 -->
          <!-- <img src="/images/playground/resume/header.jpg" alt="头像" /> -->
        </div>
        <div class="person-info">
          <div class="person-base-info">
            <h1>XXXXX ! XXX</h1>
            <p class="tags">
              <span>男</span>
              <span>1997/03</span>
              <span>在职：观察中</span>
              <span>七年开发经验</span>
              <span>软件开发</span>
              <span>12K-15K</span>
            </p>
            <p class="icon-tags">
              <span>
                <FontAwesomeIcon
                  :icon="['fas', 'phone']"
                  color="white"
                  aria-hidden="true"
                />
                15948372001
              </span>
              <span>
                <FontAwesomeIcon
                  :icon="['fas', 'envelope']"
                  color="white"
                  aria-hidden="true"
                />
                liuxinyudeya2018@163.com
              </span>
            </p>
          </div>
          <div class="person-introduce">
            <h2 class="introduce-title">
              <FontAwesomeIcon
                icon="fa-solid fa-signature"
                style="color: #ffd43a"
                aria-hidden="true"
              />
              <span>自我评价</span>
            </h2>
            <ol class="introduce-desc">
              <li>
                七年开发经验。三年 java 后端，四年 uniapp Vue 前端。熟悉 Vue
                生态，sql， nginx ，git 等技术。
              </li>
              <li>
                项目经历丰富，个人博客， pc 端，app
                ，小程序等政务系统无数（10±）
              </li>
              <li>做事认真负责有始有终，做人谦逊好学不骄不躁</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="resume-body">
      <div class="card">
        <div class="card-title">
          <FontAwesomeIcon
            icon="fa-solid fa-graduation-cap"
            color="#2d2ef0"
            aria-hidden="true"
          />
          <span>教育经历</span>
          <div class="line"></div>
        </div>
        <div class="card-info">
          <span>长春工业大学 · 计算机科学与技术 · 本科</span>
          <span>2015/09 - 2019/06</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <FontAwesomeIcon
            icon="fa-solid fa-briefcase"
            color="#2d2ef0"
            aria-hidden="true"
          />
          <span>项目经历</span>
          <div class="line"></div>
        </div>
        <div class="card-info">
          <span>四川久远银海股份有限公司</span>
          <span>2019/03 - 至今</span>
        </div>
        <div class="desc">
          <h2>负责领域：</h2>
          <p>
            建设吉林省社会保险事业管理局、吉林省人力资源和社会保障厅数字化信息系统。包在
            pc 端、移动端以及其他终端设备建设申报、经办等业务系统。
          </p>
          <h2>项目开发：</h2>
          完整参与以下系统建设
          <ul>
            <li class="a-addr yellow">
              <a href="https://ggfw.jlsi.jl.gov.cn"
                >吉林省社会保险公共服务平台</a
              >
            </li>
            <li class="a-addr green">
              <a href="https://cczhrs.ccrs.changchun.gov.cn/"
                >长春市智慧人社网上办事大厅</a
              >
            </li>
            <li class="a-addr blue">
              <a href="https://www.qqhr-rc.org.cn"
                >齐齐哈尔市就业和人力资源服务网</a
              >
            </li>
            <li class="a-addr purple">
              <a href="http://www.jlsrskszx.cn">吉林省人事考试网</a>
            </li>
            <li class="a-addr mini-program orange">长春人社小程序</li>
            <li class="a-addr mini-program pink">长春零工小程序</li>
            <li class="a-addr mini-program teal">鹤城就业小程序</li>
          </ul>
          <h2>业务能力：</h2>
          <h3>全栈系统建设能力：</h3>
          <p>
            深度参与人社领域数字化项目的需求分析、系统设计、开发落地与运维优化，能够根据业务部门需求快速响应，定制化实现各类申报、经办流程。
          </p>
          <h3>多端融合开发经验：</h3>
          <p>
            PC端Web应用、移动端小程序以及混合终端的开发与适配，确保多端数据同步、界面统一、体验流畅。
          </p>
          <h3>复杂政务系统整合：</h3>
          <p>
            熟悉政府信息化项目的规范与流程，具备跨系统数据对接、信息安全保障及高并发场景下的性能调优能力，多次参与省级、市级人社平台的升级改造。
          </p>
          <h3>跨部门协作与项目管理：</h3>
          <p>
            与业务处室、第三方厂商紧密配合，推动项目按时保质上线，并持续跟进用户反馈进行迭代，保证系统稳定运行。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ----- 变量定义 -----
$color-black: #010002;
$color-blue: #2c2ef0;
$color-white: #f9fefa;
$font-size: 16px;
$ine-height: 1.5; // 可能是笔误，但保留原样

$head-padding: 32px;
$head-img-width: 280px;
$head-img-height: 360px;
$bg-height: calc(34px + 32px + 32px + $head-img-height / 2);
$resume-header: calc(34px + 32px + 32px + $head-img-height + 64px);

// ----- 辅助类（隐藏但可访问）-----
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

// ----- 主容器 -----
.resume-container {
  box-sizing: border-box;
  font-size: $font-size;
  position: relative;
  margin: 0 auto;
  padding: 32px 24px;
  width: 1240px;
  height: 1754px;
  background-color: $color-black;
  font-family:
    "宋体",
    SimSun,
    "微软雅黑",
    Microsoft YaHei,
    Arial,
    sans-serif;
  line-height: 1.5;
  border-radius: 32px;
  overflow: hidden;

  // ----- 头部区域 -----
  .resume-header {
    width: 100%;
    height: $resume-header;
    position: relative;

    .bg {
      width: 100%;
      height: $bg-height;
      background-color: $color-blue;
      border-radius: 36px;
      overflow: hidden;

      .skill-tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
        margin: $head-padding;

        ul {
          li {
            margin-right: 16px;
            display: inline-block;
            padding: 4px 16px;
            border: 1px solid $color-white;
            color: $color-white;
            border-radius: 999px;
            white-space: nowrap;
          }
        }
      }
    }

    .person-card {
      position: absolute;
      top: 34px + 32px + 32px;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: $head-img-height;

      .person-head-img {
        margin: 0 32px;
        width: $head-img-width;
        height: $head-img-height;
        border: 1px solid red;
        border-radius: 16px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .person-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        height: 100%;

        .person-base-info,
        .person-introduce {
          width: 100%;
          height: 50%;
        }

        .person-base-info {
          h1 {
            font-size: xx-large;
            line-height: 1.5;
            font-weight: bold;
            font-size: 32px;
            color: #fff;
            margin-bottom: 32px;
          }

          .tags {
            margin: 16px 0;

            span {
              position: relative;
              padding: 0 16px;
              color: $color-white;

              &:not(:first-child)::before {
                content: "";
                position: absolute;
                left: 0px;
                top: 20%;
                height: 60%;
                width: 1px;
                background-color: #ccc;
              }

              &:first-child {
                padding-left: 0;
              }
            }
          }

          .icon-tags {
            color: $color-white;

            span {
              margin-right: 16px;
            }
          }
        }

        .person-introduce {
          margin-top: 32px;
          padding: 16px;
          border: 1px solid $color-white;
          border-radius: 16px;
          color: $color-white;

          .introduce-title {
            span {
              margin-left: 8px;
              font-weight: bold;
              font-size: 18px;
            }
          }

          .introduce-desc {
            margin-top: 8px;
            font-size: 16px;
            list-style-type: decimal;
            padding-left: 1em;
          }
        }
      }
    }
  }

  // ----- 主体区域 -----
  .resume-body {
    padding: $head-padding;
    width: 100%;
    height: calc(100% - $resume-header);
    background-color: #fff;
    border-radius: 32px;
    overflow: hidden;

    .card {
      margin-bottom: 32px;

      .card-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        gap: 16px;

        span {
          font-size: 22px;
          font-weight: bold;
          color: #010002;
        }

        .line {
          flex-grow: 1;
          height: 1px;
          border: 1px solid #ccc;
        }
      }

      .card-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0;
        padding-left: 36px;
        font-size: 20px;
        font-weight: 400;
        color: #010002;
      }

      .desc {
        padding-left: 36px;
        ul {
          .a-addr {
            text-decoration: underline; /* 添加下划线 */
            text-decoration-color: red; /* 下划线颜色 */
            text-decoration-style: wavy; /* 样式：solid, double, dotted, dashed, wavy */
            text-decoration-thickness: 2px; /* 下划线粗细 */
            text-underline-offset: 0.2em; /* 下划线与文字的偏移量 */
          }
          .yellow {
            text-decoration-color: #ffd43a;
          }
          .green {
            text-decoration-color: #64e6be;
          }
          .blue {
            text-decoration-color: #74c0fc;
          }
          .purple {
            text-decoration-color: #b197fc;
          }
          .orange {
            text-decoration-color: #ff9f4b; // 暖橙色
          }
          .pink {
            text-decoration-color: #f783ac; // 柔粉色
          }
          .teal {
            text-decoration-color: #4fd1c5; // 薄荷绿/青绿色
          }
        }
      }
    }
  }

  // ========== 新增正文样式优化 ==========
  // 正文基础
  .resume-body,
  .person-introduce {
    color: #333; // 白色背景上文字颜色更柔和
  }

  .resume-body p {
    margin-bottom: 1em;
  }

  // 列表样式
  .introduce-desc {
    padding-left: 1.5em; // 增加左内边距，让序号更清晰
    margin: 0.5em 0 1em;
  }
  .introduce-desc li {
    margin-bottom: 0.5em; // 列表项间距
  }

  .resume-body .desc ul {
    list-style-type: disc;
    padding-left: 2em;
    margin: 0.5em 0 1em;
  }
  .resume-body .desc ul li {
    margin-bottom: 0.3em;
  }

  // 标题与正文间距
  .desc h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 1.2em 0 0.5em;
    color: #010002;
  }
  .desc h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1em 0 0.3em;
    // color: $color-blue; // 用蓝色作为小标题强调
  }

  // 行高优化
  .resume-body .desc,
  .resume-body .card-info {
    line-height: 1.6;
    font-weight: 400;
  }

  // ========== 响应式适配 ==========
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 16px;

    .resume-header .person-card {
      flex-direction: column;
      height: auto;
    }
    .person-head-img {
      margin-bottom: 20px;
    }
  }
}
</style>
