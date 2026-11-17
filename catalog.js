window.MARKET_CATALOG = {
  "schema": 2,
  "brand": "RaM · AI出活工作室",
  "products": [
    {
      "id": "A01",
      "name": "选型速诊",
      "category": "咨询与诊断",
      "description": "针对一个框架、模型、向量库或数据库选择给出范围内结论与理由。",
      "scope": "一个明确选型问题，输出短结论与依据，不含长期架构陪跑。",
      "inputs": "目标、约束、候选方案和必要的脱敏背景。",
      "deliverables": "文字结论与下一步建议。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 19,
        "originalPriceText": "¥19",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "A02",
      "name": "代码快评 Top 3",
      "category": "代码服务",
      "description": "快速定位提交或代码片段中最值得先处理的三个问题。",
      "scope": "小范围代码口述快评，不替代全面审计。",
      "inputs": "获授权的代码片段或单个PR、运行目标和问题描述。",
      "deliverables": "Top 3问题、风险级别与口头/文字建议。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 19,
        "originalPriceText": "¥19",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "A03",
      "name": "现成脚手架",
      "category": "网站与原型",
      "description": "从已核验范围内挑选静态展示、全栈起手或工具链骨架，按需求整理成演示原型。",
      "scope": "精选骨架与有限定制；不打包上游所有权，不承诺任意平台即插即用。",
      "inputs": "页面目标、内容、技术约束、可用素材与授权说明。",
      "deliverables": "静态演示站或冻结版本骨架；范围外依需求另报。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 29,
        "originalPriceText": "¥29–99",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "A04",
      "name": "救命 Debug",
      "category": "代码服务",
      "description": "围绕一个可复现问题定位根因，给出最小修补与回归方向。",
      "scope": "单一问题或小模块；是否能修复需先复现，不承诺固定行数或一次解决。",
      "inputs": "最小复现、日志摘要、版本与获授权代码，不要提交密钥。",
      "deliverables": "根因说明、补丁候选与回归步骤。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 49,
        "originalPriceText": "¥49起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "49 / 69 / 119"
      },
      "group": "technical"
    },
    {
      "id": "A05",
      "name": "环境 / 构建救援",
      "category": "代码服务",
      "description": "针对已知系统与依赖范围排查安装、构建或打包阻塞。",
      "scope": "熟悉系统的有限排查；不把配置生成当作真实上线或构建通过。",
      "inputs": "系统版本、依赖清单、可复现命令和脱敏错误摘要。",
      "deliverables": "诊断结论、修复步骤或小范围配置调整。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 59,
        "originalPriceText": "¥59起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "59 / 89 / 149"
      },
      "group": "technical"
    },
    {
      "id": "A06",
      "name": "Code Review",
      "category": "代码服务",
      "description": "按严重度整理单个PR或小范围代码的必改项与可选项。",
      "scope": "小范围人工评审，不替代全面安全审计、渗透测试或合规认证。",
      "inputs": "获授权的单PR或代码范围、目标行为和测试方式。",
      "deliverables": "严重度清单、必改项、可选项与回归建议。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 49,
        "originalPriceText": "¥49起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "49 / 79 / 129"
      },
      "group": "technical"
    },
    {
      "id": "A07",
      "name": "API 联调",
      "category": "代码服务",
      "description": "在客户自备服务与授权范围内整理鉴权、流式或工具调用的可跑示例。",
      "scope": "单一接口链路；客户负责服务、账号与费用，不读取或保存密钥。",
      "inputs": "接口文档、脱敏请求样例、测试endpoint和预期响应。",
      "deliverables": "本地可跑demo、问题清单与联调说明。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 59,
        "originalPriceText": "¥59起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "59 / 89 / 149"
      },
      "group": "technical"
    },
    {
      "id": "A08",
      "name": "Prompt 调优",
      "category": "AI 内容与流程",
      "description": "用明确用例和评分表比较提示词改动前后表现。",
      "scope": "限定任务与5条用例，不承诺泛化收益或固定模型效果。",
      "inputs": "目标、原提示词、5条代表性用例和评价标准。",
      "deliverables": "改后版本、评分表和前后对比。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 49,
        "originalPriceText": "¥49起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "49 / 69 / 119"
      },
      "group": "technical"
    },
    {
      "id": "A09",
      "name": "Agent / 工作流调试",
      "category": "代码服务",
      "description": "围绕工具调用失败、循环或检索问题做小范围配置与流程诊断。",
      "scope": "离线或已确认宿主的小范围问题，不承诺适配所有Agent平台。",
      "inputs": "脱敏流程、失败样例、版本与日志摘要。",
      "deliverables": "问题定位、配置建议与有限回归步骤。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 79,
        "originalPriceText": "¥79起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "79 / 119 / 199"
      },
      "group": "technical"
    },
    {
      "id": "A10",
      "name": "Token 账单瘦身",
      "category": "AI 内容与流程",
      "description": "从脱敏调用统计出发，提出缓存、截断或模型分流方向。",
      "scope": "诊断与最多三条改动建议，不替代财务核算。",
      "inputs": "脱敏调用账单、基线、上下文长度和目标。",
      "deliverables": "诊断摘要与改动清单。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 49,
        "originalPriceText": "¥49",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "A11",
      "name": "上线代做",
      "category": "部署与交付",
      "description": "针对已确认项目整理部署配置与上线步骤。",
      "scope": "逐项目验收；配置文件不等于真实HTTPS上线，不承诺任意宿主即成。",
      "inputs": "项目、目标主机、域名、部署权限与回滚要求。",
      "deliverables": "部署方案、配置候选与操作记录摘要。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 129,
        "originalPriceText": "¥129",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "A12",
      "name": "小项目代做",
      "category": "网站与原型",
      "description": "在限定工作量内制作静态主页、活动展示页或简单看板原型。",
      "scope": "有限静态或演示原型；表单、支付、后端和长期维护另定。",
      "inputs": "页面结构、文案、素材、品牌色与验收清单。",
      "deliverables": "可打开的静态页面或原型包及使用说明。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 199,
        "originalPriceText": "¥199起",
        "note": "参考价格；确认内容、范围与排期后报价。",
        "referenceRange": "199 / 299 / 499"
      },
      "group": "technical"
    },
    {
      "id": "A13",
      "name": "两天救援通道",
      "category": "代码服务",
      "description": "限量排班的短时问题处理通道，按约定次数与时长服务。",
      "scope": "最多三次、每次不超过45分钟的排班服务，不是源码商品或无限支持。",
      "inputs": "问题清单、优先级、可用时间与授权材料。",
      "deliverables": "每次处理结论、下一步与未完成项。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 199,
        "originalPriceText": "¥199",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "technical"
    },
    {
      "id": "B02",
      "name": "大肥鱼BOT部署",
      "category": "桌面工具",
      "description": "代理QQ账号：人设、触发规则与消息回复配置",
      "scope": "客户自备并授权的QQ账号；配置人设、触发规则与消息回复。不含语音、自启、托管及平台可用性保证。",
      "inputs": "自备并授权的QQ账号、期望人设、触发与回复规则。",
      "deliverables": "约定环境内的部署配置、规则说明与交接。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 19,
        "originalPriceText": "¥19",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B04",
      "name": "海报 1 张",
      "category": "视觉内容",
      "description": "围绕招新、活动或社团主题制作一张可编辑海报候选。",
      "scope": "合成演示支持海报方向；真实客户素材与印刷验收另行确认。",
      "inputs": "主题、文案、尺寸、品牌信息和已授权素材。",
      "deliverables": "PNG/PDF预览与可编辑交付候选。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 29,
        "originalPriceText": "¥29",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B09",
      "name": "课程汇报 PPT",
      "category": "演示文档",
      "description": "按课程大纲整理基础汇报幻灯片结构、图表与讲稿要点。",
      "scope": "合成12页结构样品可演示；内容质量、投屏与目标Office兼容需人工确认。",
      "inputs": "大纲、素材、数据、页数、模板偏好与讲稿要求。",
      "deliverables": "PPTX候选、讲稿要点与预览。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 59,
        "originalPriceText": "¥59",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B10",
      "name": "问卷 / 数据整理",
      "category": "数据处理",
      "description": "在确认字段规则后清洗小型问卷数据并制作可解释图表。",
      "scope": "样例支持清洗、审计摘要与三图；不自动修改业务含义或补空值。",
      "inputs": "脱敏CSV/XLSX、字段定义、去重规则与目标图表。",
      "deliverables": "清洗表、审计摘要、图表与结论页候选。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 49,
        "originalPriceText": "¥49起",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B11",
      "name": "视频代剪",
      "category": "视频内容",
      "description": "针对短视频素材整理基础剪辑需求与交付范围。",
      "scope": "当前仅有基础处理线索，字幕、配乐、封面和端到端验收未完整确认。",
      "inputs": "获授权视频、目标时长、平台规格与字幕稿。",
      "deliverables": "需按确认范围提供视频候选与修改记录。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 59,
        "originalPriceText": "¥59起",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B12",
      "name": "短视频切片 ×3",
      "category": "视频内容",
      "description": "将长视频整理为竖屏切片候选，适合先做剪辑范围确认。",
      "scope": "已有等分竖屏裁切线索不等于完成高光选段或成片。",
      "inputs": "获授权长视频、目标平台、切片主题与字幕稿。",
      "deliverables": "按确认标准输出切片候选或先给范围评估。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 69,
        "originalPriceText": "¥69",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B13",
      "name": "路演 / 竞赛 PPT",
      "category": "演示文档",
      "description": "预约制作逻辑、视觉与讲稿提纲更完整的路演演示。",
      "scope": "B09样品仅作基础PPT能力参考，不代表本SKU的15–20页交付已完成。",
      "inputs": "项目材料、受众、页数、数据、口播时长与品牌要求。",
      "deliverables": "预约范围内PPTX、讲稿提纲与口播稿候选。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 129,
        "originalPriceText": "¥129",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "B14",
      "name": "摊位数字化包",
      "category": "网站与原型",
      "description": "为摊位整理展示页与内容物料的组合方案。",
      "scope": "不把展示页样品包装为完整支付预约系统；真实支付、预约后端与切片另验。",
      "inputs": "摊位信息、菜单、品牌素材、预约流程与平台要求。",
      "deliverables": "展示页/海报等已确认子项及交接说明。",
      "sampleIds": [],
      "pricing": {
        "baseCny": 199,
        "originalPriceText": "¥199",
        "note": "参考价格；确认内容、范围与排期后报价。"
      },
      "group": "creative"
    },
    {
      "id": "W01",
      "name": "个人作品集",
      "category": "网站模板",
      "group": "templates",
      "description": "把经历、项目与联系方式，整理成清晰的个人主页。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/portfolio/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Varad Portfolio",
        "source": "https://github.com/varadbhogayata/varadbhogayata.github.io",
        "license": "MIT",
        "licenseFile": "templates/portfolio/LICENSE"
      }
    },
    {
      "id": "W02",
      "name": "社团活动页",
      "category": "网站模板",
      "group": "templates",
      "description": "活动介绍、日程与参与指引，集中在一个轻量页面。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/community/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Creative",
        "source": "https://github.com/StartBootstrap/startbootstrap-creative",
        "license": "MIT",
        "licenseFile": "templates/community/LICENSE"
      }
    },
    {
      "id": "W03",
      "name": "企业展示站",
      "category": "网站模板",
      "group": "templates",
      "description": "用服务、优势与项目介绍，建立品牌的线上门面。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/business/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Agency",
        "source": "https://github.com/StartBootstrap/startbootstrap-agency",
        "license": "MIT",
        "licenseFile": "templates/business/LICENSE"
      }
    },
    {
      "id": "W04",
      "name": "产品落地页",
      "category": "网站模板",
      "group": "templates",
      "description": "围绕一个产品展示卖点、功能与行动入口。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/landing/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Landing Page",
        "source": "https://github.com/StartBootstrap/startbootstrap-landing-page",
        "license": "MIT",
        "licenseFile": "templates/landing/LICENSE"
      }
    },
    {
      "id": "W05",
      "name": "博客内容站",
      "category": "网站模板",
      "group": "templates",
      "description": "用文章列表与阅读页，承载持续更新的内容。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/blog/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "AstroPaper",
        "source": "https://github.com/satnaing/astro-paper",
        "license": "MIT",
        "licenseFile": "templates/blog/LICENSE"
      }
    },
    {
      "id": "W06",
      "name": "ram-admin 后台管理系统",
      "category": "网站模板",
      "group": "templates",
      "description": "Ram-AdminX 本地真实运行截图：仪表盘、用户管理、角色管理与审批页面。",
      "scope": "本项目本地运行截图；数据为演示数据。Django + SQLite 后端与 Vue 前端已本地运行；AI 为原生 mock，未接外部模型。本站仅提供截图图库，不提供在线后台登录。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "按约定范围交付二次开发与部署说明；业务功能、运行环境与维护另确认。",
      "demo": "templates/ram-admin/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Ram-AdminX",
        "source": "https://github.com/RaM-bugourp/ram-admin",
        "license": "原项目声明与二开授权",
        "licenseFile": "templates/ram-admin/NOTICE.html"
      }
    }
  ],
  "templates": [
    {
      "id": "W01",
      "name": "个人作品集",
      "category": "网站模板",
      "group": "templates",
      "description": "把经历、项目与联系方式，整理成清晰的个人主页。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/portfolio/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Varad Portfolio",
        "source": "https://github.com/varadbhogayata/varadbhogayata.github.io",
        "license": "MIT",
        "licenseFile": "templates/portfolio/LICENSE"
      }
    },
    {
      "id": "W02",
      "name": "社团活动页",
      "category": "网站模板",
      "group": "templates",
      "description": "活动介绍、日程与参与指引，集中在一个轻量页面。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/community/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Creative",
        "source": "https://github.com/StartBootstrap/startbootstrap-creative",
        "license": "MIT",
        "licenseFile": "templates/community/LICENSE"
      }
    },
    {
      "id": "W03",
      "name": "企业展示站",
      "category": "网站模板",
      "group": "templates",
      "description": "用服务、优势与项目介绍，建立品牌的线上门面。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/business/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Agency",
        "source": "https://github.com/StartBootstrap/startbootstrap-agency",
        "license": "MIT",
        "licenseFile": "templates/business/LICENSE"
      }
    },
    {
      "id": "W04",
      "name": "产品落地页",
      "category": "网站模板",
      "group": "templates",
      "description": "围绕一个产品展示卖点、功能与行动入口。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/landing/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Landing Page",
        "source": "https://github.com/StartBootstrap/startbootstrap-landing-page",
        "license": "MIT",
        "licenseFile": "templates/landing/LICENSE"
      }
    },
    {
      "id": "W05",
      "name": "博客内容站",
      "category": "网站模板",
      "group": "templates",
      "description": "用文章列表与阅读页，承载持续更新的内容。",
      "scope": "原创无图静态风格样板，可离线打开；确认内容与修改范围后定制。表单与按钮仅演示交互，不发送信息。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "约定范围内的静态页面与交接说明；域名、托管及业务功能另确认。",
      "demo": "templates/blog/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "AstroPaper",
        "source": "https://github.com/satnaing/astro-paper",
        "license": "MIT",
        "licenseFile": "templates/blog/LICENSE"
      }
    },
    {
      "id": "W06",
      "name": "ram-admin 后台管理系统",
      "category": "网站模板",
      "group": "templates",
      "description": "Ram-AdminX 本地真实运行截图：仪表盘、用户管理、角色管理与审批页面。",
      "scope": "本项目本地运行截图；数据为演示数据。Django + SQLite 后端与 Vue 前端已本地运行；AI 为原生 mock，未接外部模型。本站仅提供截图图库，不提供在线后台登录。",
      "inputs": "页面用途、文字内容、获授权素材、希望修改的地方。",
      "deliverables": "按约定范围交付二次开发与部署说明；业务功能、运行环境与维护另确认。",
      "demo": "templates/ram-admin/index.html",
      "sampleIds": [],
      "pricing": {
        "baseCny": null,
        "originalPriceText": "按模板与修改范围报价",
        "note": "先看模板，确认内容、范围、报价与排期。"
      },
      "preparedTemplate": {
        "name": "Ram-AdminX",
        "source": "https://github.com/RaM-bugourp/ram-admin",
        "license": "原项目声明与二开授权",
        "licenseFile": "templates/ram-admin/NOTICE.html"
      }
    }
  ],
  "policy": "先看模板，确认内容、范围、报价与排期。",
  "attribution": "五类原创无图静态风格样板与 ram-admin 本地真实运行截图库；保留第三方原作者及二次开发归属。"
};
