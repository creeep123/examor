# 角色手册


<img src="https://img.shields.io/badge/version-0.1-%23fff?style=flat-square&labelColor=7d09f1">

> [!IMPORTANT]
> 使用gpt-3.5型号时，可能会出现输出不稳定的情况。 如果想获得最佳的角色效果，建议使用gpt-4模型

### 属性介绍

- 扩展性：
  扩展性表示问题基于文档内容的扩展程度，同理，当扩展性更强的角色，会使问题的难度增加

- 严格程度：
  严格程度表示角色的打分有多么严格，即越严格的角色会对答案的评分更加苛刻，而严格度低的角色会对答案抱有一些同情分（不太离谱的情况下，一般不会给 0 分）

### 角色介绍

#### 🥷 考官

| 扩展性 | 严格程度 |
| ------ | -------- |
| ⭐️    | 😭       |

考官是一个十分严格的角色，他会严格的根据文档内容生成问题，并且他对打分的苛刻程度很高，你很的难会在他的手中得到满分，除非你的问题与文档几乎无差别

#### 👩‍🏫 教师

| 扩展性 | 严格程度 |
| ------ | -------- |
| ⭐️⭐️ | 😏       |

教师是一位慈祥的角色，她会把你的答题当成一次平日的小检测，所以她并不会严格的打分。并且她也会根据你的文档内容进行一定程度的扩展，当然放心，只是很小程度的扩展

#### 👨‍💻 面试官

| 扩展性    | 严格程度 |
| --------- | -------- |
| ⭐️⭐️⭐️ | 😐       |

面试官会把你带到一个面试的环境之中，他出的题目几乎都是基于文档内容扩展而来的，所以也是难度最高的角色。但他并不会特别严格，它考验的更多的是你对知识广度的了解，就如同真的在面试中，面试官的评测是多方位的

### 注意

在生成问题的时候，会将生成问题时的角色存储在这个问题的信息之中。也就是说，当一个问题是使用 **考官** 角色生成的，那么在以后对该问题的回答时也会以 **考官** 的角色进行检测。生成问题的角色会在问题组件中展示

<img src="./screen-shot/role-emoji-zh.png">

### 案例

在本节中，我会分别使用三个角色对同一片文档进行问题的生成，可以感受一下不同角色在场景上的区别。以下是我的文档内容

```markdown
### **Vue3 相比于 Vue2 的优化**

- 更小的体积
  - Vue3 的体积比 Vue2 要小很多，这是因为 Vue3 移除了一些过时或者不常用的特性，并对代码进行了优化。
  - Vue3 中将编译器和运行时进行了拆分，这使得在运行时只需要加载运行时的代码，而编译器的代码只在开发阶段使用
- 更快的渲染速度
  - Vue3 的渲染引擎使用了 **编译时优化**（Compile-time Optimizations）技术，通过静态分析模版代码，生成优化后的渲染函数，提升了渲染速度
  - Vue3 的编译器会在编译模版时，将模版编译成渲染函数并缓存，避免每次渲染时都需要重新编译模版的开销
- 更好的 Typescript 支持
  Vue3 提供了更好的 Typescript 支持，包括更完善的类型定义、更好的类型判断等，能够更好的组织代码，提供可读性和可维护性
- 虚拟 DOM 优化
  - 静态提升：在 Vue 3 中，标记为静态的节点可以被优化为一个常量，避免在 diff 算法中对其进行不必要的比较。静态节点是指在渲染过程中不会变化的节点，可以通过 `hoistStatic` 编译选项开启静态提升
  - 懒执行：在 Vue 3 中，可以使用 `suspense` 和 `lazy` 指令来实现懒执行
    - `suspense` 是一种占位符组件，他可以在异步组件加载完成之前显示占位符
    - `lazy` 指令可以在组件首次渲染时不立即渲染，而是等到组件进入视口时才渲染
  - 缓存：Vue 可以缓存已经渲染的组件，以避免不必要的重新渲染，可以通过 `cacheHandlers` 编译选项来开启缓存
- 响应式系统优化
  - Vue 3 使用了 ES6 的 `Proxy` 类来监听对象的变化，原因是 `Proxy` 可以观察整个对象，而 `Object.definProperty` 只能监听对象中的某个属性，如果要监听整个对象需要递归遍历，另外 `Map` / `Set` 类型的属性也可以进行监听
  - Vue 3 还引入了新的 `reactive` 和 `readonly` 来提供更细粒度的控制，可以用 `reactive` 创建可响应的对象，使用 `readonly` 来创建只读对象
- 更好的 Tree-Shaking
  Vue3 改进了对 Tree-shaking 的支持，可以更好的从代码中剔除没用到的模块，减少打包后的文件大小
- 更好的代码分割和懒加载
  Vue3 使用了 **动态 import** 技术，能够将组件按需进行代码分割和懒加载，减小初始加载文件的大小
- 更好的模版编译
  Vue3 的编译器进行了重写，其不依赖于之前的模版编译器，Vue3 中的编译器使用了静态分析的技术，他可以在编译时分析模版发现静态节点，进行 ”静态提升“ 生成优化后的渲染函数，可以更精准的分析模版依赖关系，减少不必要的模版编译和运行时代码生成
```

#### 考官

- 生成的问题

```markdown
- Vue3 相比于 Vue2 有哪些优化？
- Vue3 中如何实现更快的渲染速度？
- Vue3 对 Typescript 的支持有哪些改进？
- Vue3 中如何优化虚拟 DOM？
- Vue3 的响应式系统有哪些优化？
- Vue3 如何支持更好的 Tree-Shaking？
- Vue3 如何实现更好的代码分割和懒加载？
```

#### 教师

- 生成的问题

```markdown
- Vue3 相比于 Vue2 有哪些优化？
- Vue3 是如何优化渲染速度的？
- Vue3 对 Typescript 有哪些优化支持？
- Vue3 中的虚拟 DOM 优化有哪些？
- Vue3 的响应式系统是如何优化的？
- Vue3 改进了对 Tree-shaking 的支持，具体有哪些改进？
- Vue3 如何优化模版编译？
```

#### 面试官

- 生成的问题

```markdown
- Vue3 相较于 Vue2 体积更小的原因是什么？
- Vue3 如何通过静态分析优化渲染速度？
- 在 Vue3 中，静态节点是指什么？它们在渲染过程中有什么优化作用？
- 在 Vue3 中如何实现懒执行？
- Vue3 对响应式系统做了哪些优化，为什么使用 `Proxy`？
- Vue3 如何支持 Tree-Shaking？
- Vue3 如何实现模板编译并生成优化后的渲染函数？
```
