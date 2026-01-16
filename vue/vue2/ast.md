# ast

```js [parse]
// 将模板字符串解析为AST（抽象语法树）
function parse(template, options) {
  // 警告函数，用于输出编译警告
  warn = options.warn || baseWarn;
  // 判断标签是否为pre标签的平台特定方法
  platformIsPreTag = options.isPreTag || no;
  // 判断属性是否需要绑定为DOM property的平台特定方法
  platformMustUseProp = options.mustUseProp || no;
  // 获取标签命名空间的平台特定方法
  platformGetTagNamespace = options.getTagNamespace || no;

  // 判断是否为保留标签（HTML/SVG标签）
  var isReservedTag = options.isReservedTag || no;

  // 判断元素是否为组件的函数
  maybeComponent = function (el) {
    return !!(
      (
        el.component || // 已经是组件
        el.attrsMap[":is"] || // 动态组件
        el.attrsMap["v-bind:is"] || // 动态组件
        !(el.attrsMap.is // 检查is属性
          ? isReservedTag(el.attrsMap.is) // 如果is属性是保留标签，则不是组件
          : isReservedTag(el.tag))
      ) // 否则检查标签本身是否是保留标签
    );
  };

  // 从模块中提取各种转换函数
  transforms = pluckModuleFunction(options.modules, "transformNode");
  preTransforms = pluckModuleFunction(options.modules, "preTransformNode");
  postTransforms = pluckModuleFunction(options.modules, "postTransformNode");

  // 插值分隔符，默认是{{}}
  delimiters = options.delimiters;

  // 解析过程中的栈，用于跟踪当前父元素
  var stack = [];
  // 是否保留空白字符
  var preserveWhitespace = options.preserveWhitespace !== false;
  // 空白字符处理选项
  var whitespaceOption = options.whitespace;

  // AST的根节点
  var root;
  // 当前父节点
  var currentParent;
  // 是否在v-pre指令范围内（跳过编译）
  var inVPre = false;
  // 是否在<pre>标签内
  var inPre = false;
  // 是否已经警告过（用于避免重复警告）
  var warned = false;

  // 一次性警告函数（只警告一次）
  function warnOnce(msg, range) {
    if (!warned) {
      warned = true;
      warn(msg, range);
    }
  }

  // 关闭元素时的处理函数
  function closeElement(element) {
    // 1. 移除末尾空白字符
    trimEndingWhitespace(element);

    // 2. 如果不在v-pre范围内且元素未处理过，则处理元素指令
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }

    // 3. 树结构管理
    if (!stack.length && element !== root) {
      // 允许根元素带有v-if、v-else-if和v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        // 将条件分支添加到根元素的条件列表中
        addIfCondition(root, {
          exp: element.elseif,
          block: element,
        });
      } else {
        // 根元素只能有一个（除非使用条件渲染）
        warnOnce(
          "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }

    // 4. 将元素添加到父元素中
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        // 处理条件分支
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // 处理作用域插槽
          var name_1 = element.slotTarget || '"default"';
          (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[
            name_1
          ] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // 5. 清理子元素
    // 过滤掉作用域插槽（已单独处理）
    element.children = element.children.filter(function (c) {
      return !c.slotScope;
    });

    // 再次移除末尾空白字符
    trimEndingWhitespace(element);

    // 6. 更新预处理状态
    if (element.pre) {
      inVPre = false; // 退出v-pre范围
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false; // 退出<pre>标签
    }

    // 7. 应用后置转换
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  // 移除元素末尾的空白文本节点
  function trimEndingWhitespace(el) {
    if (!inPre) {
      // <pre>标签内保留所有空白
      var lastNode = void 0;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 && // 文本节点
        lastNode.text === " " // 且是空格
      ) {
        el.children.pop();
      }
    }
  }

  // 检查根元素的约束条件
  function checkRootConstraints(el) {
    // slot和template不能作为根元素，因为它们可能包含多个节点
    if (el.tag === "slot" || el.tag === "template") {
      warnOnce(
        "Cannot use <".concat(
          el.tag,
          "> as component root element because it may "
        ) + "contain multiple nodes.",
        { start: el.start }
      );
    }
    // 根元素不能使用v-for
    if (el.attrsMap.hasOwnProperty("v-for")) {
      warnOnce(
        "Cannot use v-for on stateful component root element because " +
          "it renders multiple elements.",
        el.rawAttrsMap["v-for"]
      );
    }
  }

  // 使用HTML解析器解析模板
  parseHTML(template, {
    warn: warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag, // 自闭合标签
    canBeLeftOpenTag: options.canBeLeftOpenTag, // 可省略闭合标签
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments, // 是否保留注释
    outputSourceRange: options.outputSourceRange, // 是否输出源码位置信息

    // 开始标签的回调
    start: function (tag, attrs, unary, start, end) {
      // 确定命名空间（继承父元素的命名空间）
      var ns =
        (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // 处理IE的SVG bug
      if (isIE && ns === "svg") {
        attrs = guardIESVGBug(attrs);
      }

      // 创建AST元素节点
      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      // 开发环境：记录源码位置和属性映射
      {
        if (options.outputSourceRange) {
          element.start = start;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (
            cumulated,
            attr
          ) {
            cumulated[attr.name] = attr;
            return cumulated;
          },
          {});
        }
        // 检查动态属性表达式是否合法
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn(
              "Invalid dynamic argument expression: attribute names cannot contain " +
                "spaces, quotes, <, >, / or =.",
              options.outputSourceRange
                ? {
                    start: attr.start + attr.name.indexOf("["),
                    end: attr.start + attr.name.length,
                  }
                : undefined
            );
          }
        });
      }

      // 检查是否为禁止的标签（如<script>）
      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn(
          "Templates should only be responsible for mapping the state to the " +
            "UI. Avoid placing tags with side-effects in your templates, such as " +
            "<".concat(tag, ">") +
            ", as they will not be parsed.",
          { start: element.start }
        );
      }

      // 应用前置转换（在解析指令之前）
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      // 处理v-pre指令
      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true; // 进入v-pre范围
        }
      }

      // 处理<pre>标签
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }

      // 如果在v-pre范围内，处理原始属性
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // 否则处理结构指令
        processFor(element); // v-for
        processIf(element); // v-if
        processOnce(element); // v-once
      }

      // 设置根元素
      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      // 如果不是自闭合标签，将其压入栈并设为当前父元素
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        // 自闭合标签直接关闭
        closeElement(element);
      }
    },

    // 结束标签的回调
    end: function (tag, start, end) {
      var element = stack[stack.length - 1];
      // 弹出栈顶元素
      stack.length -= 1;
      currentParent = stack[stack.length - 1];

      if (options.outputSourceRange) {
        element.end = end;
      }
      // 关闭元素
      closeElement(element);
    },

    // 文本内容的回调
    chars: function (text, start, end) {
      // 如果没有当前父元素（文本在根元素之外）
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              "Component template requires a root element, rather than just text.",
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              'text "'.concat(text, '" outside root element will be ignored.'),
              {
                start: start,
              }
            );
          }
        }
        return;
      }

      // 处理IE中textarea的placeholder bug
      if (
        isIE &&
        currentParent.tag === "textarea" &&
        currentParent.attrsMap.placeholder === text
      ) {
        return;
      }

      var children = currentParent.children;

      // 空白字符处理
      if (inPre || text.trim()) {
        // 在<pre>标签内或非纯空白文本：保留原样
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // 开标签后的第一个空白节点：移除
        text = "";
      } else if (whitespaceOption) {
        // 根据空白选项处理
        if (whitespaceOption === "condense") {
          // 压缩模式：包含换行则移除，否则压缩为单个空格
          text = lineBreakRE.test(text) ? "" : " ";
        } else {
          text = " ";
        }
      } else {
        text = preserveWhitespace ? " " : "";
      }

      // 如果有文本内容
      if (text) {
        if (!inPre && whitespaceOption === "condense") {
          // 压缩连续空白字符
          text = text.replace(whitespaceRE, " ");
        }

        var res = void 0;
        var child = void 0;

        // 尝试解析为表达式文本（如{{message}}）
        if (!inVPre && text !== " " && (res = parseText(text, delimiters))) {
          child = {
            type: 2, // 表达式类型
            expression: res.expression,
            tokens: res.tokens,
            text: text,
          };
        } else if (
          text !== " " || // 非空格
          !children.length || // 第一个子节点
          children[children.length - 1].text !== " " // 前一个不是空格
        ) {
          // 纯文本节点
          child = {
            type: 3, // 文本类型
            text: text,
          };
        }

        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },

    // 注释的回调
    comment: function (text, start, end) {
      // 注释可以添加到当前父元素
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true, // 标记为注释
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    },
  });

  // 返回AST根节点
  return root;
}
```

```js [parseHTML]
// HTML 解析器核心函数
function parseHTML(html, options) {
  // 用于跟踪标签嵌套关系的栈
  var stack = [];
  // 是否期望 HTML 解析模式（与 XML 模式相对）
  var expectHTML = options.expectHTML;
  // 判断是否是自闭合标签的函数（如 <img>, <br>）
  var isUnaryTag = options.isUnaryTag || no;
  // 判断标签是否可以省略闭合标签（如 <p>, <li>）
  var canBeLeftOpenTag = options.canBeLeftOpenTag || no;
  // 当前解析位置索引
  var index = 0;
  // 上一次的 html 字符串和上一次的标签名
  var last, lastTag;

  // 主解析循环，使用 IIFE 来支持 return 控制循环
  var _loop_1 = function () {
    last = html;

    // 确保不在纯文本元素中（如 script、style）
    if (!lastTag || !isPlainTextElement(lastTag)) {
      // 查找下一个 < 字符的位置
      var textEnd = html.indexOf("<");

      // 如果以 < 开头
      if (textEnd === 0) {
        // 1. 注释处理：<!-- comment -->
        if (comment.test(html)) {
          var commentEnd = html.indexOf("-->");
          if (commentEnd >= 0) {
            if (options.shouldKeepComment && options.comment) {
              // 调用注释回调函数
              options.comment(
                html.substring(4, commentEnd), // 注释内容
                index, // 开始位置
                index + commentEnd + 3 // 结束位置
              );
            }
            // 跳过注释
            advance(commentEnd + 3);
            return "continue";
          }
        }

        // 2. 条件注释处理：<![if !IE]> ... <![endif]>
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf("]>");
          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            return "continue";
          }
        }

        // 3. 文档类型声明：<!DOCTYPE html>
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          return "continue";
        }

        // 4. 结束标签：</div>
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          // 解析结束标签
          parseEndTag(endTagMatch[1], curIndex, index);
          return "continue";
        }

        // 5. 开始标签：<div id="app">
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          // 处理开始标签
          handleStartTag(startTagMatch);
          // 处理特殊情况：忽略 <pre>、<textarea>、<listing> 后的第一个换行
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          return "continue";
        }
      }

      // 6. 文本内容处理
      var text = void 0,
        rest = void 0,
        next = void 0;

      if (textEnd >= 0) {
        // 截取从 < 开始到结尾的内容
        rest = html.slice(textEnd);

        // 处理文本中的 < 字符（可能是内容的一部分，不是标签开始）
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < 出现在纯文本中，宽容处理，将其视为文本内容
          next = rest.indexOf("<", 1);
          if (next < 0) break;
          textEnd += next;
          rest = html.slice(textEnd);
        }
        // 提取文本内容
        text = html.substring(0, textEnd);
      }

      // 如果没有找到 <，说明剩余全部是文本
      if (textEnd < 0) {
        text = html;
      }

      // 处理文本
      if (text) {
        advance(text.length);
      }

      // 调用文本内容回调
      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      // 处理纯文本元素（script、style、textarea）的内容
      var endTagLength_1 = 0;
      var stackedTag_1 = lastTag.toLowerCase();

      // 创建匹配结束标签的正则表达式（带缓存）
      var reStackedTag =
        reCache[stackedTag_1] ||
        (reCache[stackedTag_1] = new RegExp(
          "([\\s\\S]*?)(</" + stackedTag_1 + "[^>]*>)",
          "i"
        ));

      // 替换匹配到的内容
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength_1 = endTag.length;

        // 对于非纯文本元素（但实际处理时需要特殊处理的）
        if (!isPlainTextElement(stackedTag_1) && stackedTag_1 !== "noscript") {
          // 移除注释和 CDATA 部分
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, "$1") // 移除 HTML 注释
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1"); // 移除 CDATA
        }

        // 忽略第一个换行符
        if (shouldIgnoreFirstNewline(stackedTag_1, text)) {
          text = text.slice(1);
        }

        // 调用文本内容回调
        if (options.chars) {
          options.chars(text);
        }
        return "";
      });

      // 更新索引和 html
      index += html.length - rest.length;
      html = rest;
      // 解析结束标签
      parseEndTag(stackedTag_1, index - endTagLength_1, index);
    }

    // 错误处理：如果 html 没有变化，可能遇到了格式错误的标签
    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(
          'Mal-formatted tag at end of template: "'.concat(html, '"'),
          {
            start: index + html.length,
          }
        );
      }
      return "break"; // 退出循环
    }
  };

  // 主循环：持续解析直到 html 为空
  while (html) {
    var state_1 = _loop_1();
    if (state_1 === "break") break;
  }

  // 清理：解析任何剩余的未闭合标签
  parseEndTag();

  // 前进函数：更新索引并截取 html 字符串
  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  // 解析开始标签
  function parseStartTag() {
    // 匹配开始标签开始部分：<tagName
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1], // 标签名
        attrs: [], // 属性数组
        start: index, // 开始位置
      };
      advance(start[0].length);

      var end = void 0,
        attr = void 0;

      // 循环解析属性，直到遇到开始标签的结束部分
      while (
        !(end = html.match(startTagClose)) && // 不是结束部分
        (attr = html.match(dynamicArgAttribute) || html.match(attribute)) // 匹配到属性
      ) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }

      // 处理开始标签的结束部分
      if (end) {
        match.unarySlash = end[1]; // 是否为自闭合标签的 /（如 <br/>）
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  // 处理开始标签的匹配结果
  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    // HTML 模式下的特殊处理
    if (expectHTML) {
      // 如果当前标签是 p，遇到非 phrasing content 标签，则先闭合 p
      if (lastTag === "p" && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      // 如果当前标签可以省略闭合，且遇到同名的开始标签，则先闭合前一个
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    // 判断是否为自闭合标签
    var unary = isUnaryTag(tagName) || !!unarySlash;

    // 处理属性
    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // 获取属性值（来自不同的捕获组）
      var value = args[3] || args[4] || args[5] || "";

      // 特殊处理：a 标签的 href 属性需要特别解码
      var shouldDecodeNewlines =
        tagName === "a" && args[1] === "href"
          ? options.shouldDecodeNewlinesForHref
          : options.shouldDecodeNewlines;

      attrs[i] = {
        name: args[1], // 属性名
        value: decodeAttr(value, shouldDecodeNewlines), // 解码后的属性值
      };

      // 记录源码位置信息
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    // 如果不是自闭合标签，则推入栈中
    if (!unary) {
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs: attrs,
        start: match.start,
        end: match.end,
      });
      lastTag = tagName; // 更新当前标签
    }

    // 调用开始标签回调
    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  // 解析结束标签
  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;

    // 设置默认的起始和结束位置
    if (start == null) start = index;
    if (end == null) end = index;

    // 如果有标签名，查找对应的开始标签位置
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // 如果没有提供标签名，则清理所有标签（pos = 0 表示清理全部）
      pos = 0;
    }

    // 如果找到了对应的开始标签
    if (pos >= 0) {
      // 从栈顶到 pos 位置的所有标签都需要闭合
      for (var i = stack.length - 1; i >= pos; i--) {
        // 如果有不匹配的标签（i > pos）或者没有标签名，发出警告
        if ((i > pos || !tagName) && options.warn) {
          options.warn(
            "tag <".concat(stack[i].tag, "> has no matching end tag."),
            {
              start: stack[i].start,
              end: stack[i].end,
            }
          );
        }

        // 调用结束标签回调
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // 从栈中移除已闭合的标签
      stack.length = pos;
      // 更新当前标签为栈顶标签（如果有的话）
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === "br") {
      // 特殊处理：<br> 标签
      if (options.start) {
        // 将 <br> 视为自闭合标签
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === "p") {
      // 特殊处理：<p> 标签（在 HTML 中可以省略闭合）
      if (options.start) {
        // 开始新的 <p> 标签
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        // 闭合前一个 <p> 标签
        options.end(tagName, start, end);
      }
    }
  }
}
```
