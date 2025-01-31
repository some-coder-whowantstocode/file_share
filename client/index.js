  const file = document.getElementById("file");

  const Renderer = (element) => {
    try {
      if (typeof element !== "object" || element === null) {
        console.log("Renderer inside custom renderer only accepts objects");
        return null;
      }
      const { elem, val, classes = [], attr = [], children = [] } = element;

      if (typeof elem !== "string") {
        console.log("the element is missing some parameters");
        return null;
      }

      const parent = document.createElement(elem);
      parent.innerText = val;

      if (Array.isArray(attr)) {
        attr.map(([name, value]) => {
          if (typeof name === "string" && typeof value === "string") {
            parent.setAttribute(name, value);
          } else {
            console.warn("name and value in attr must be string");
          }
        });
      } else {
        console.warn("attr must be an array of [name,value]");
      }

      if (Array.isArray(classes)) {
        classes.map((c) => {
          if (typeof c === "string") {
            parent.classList.add(c);
          } else {
          }
        });
      } else {
        console.warn("classes must be an array of classnames");
      }

      if (Array.isArray(children)) {
        children.map((child) => {
          const newchild = Renderer(child);
          if (newchild) parent.appendChild(newchild);
        });
      }

      return parent;
    } catch (error) {
      console.log(error);
    }
  };

  file &&
    file.addEventListener("input", (e) => {
      try {
        const element = e.target;
        if (!element) return;
        const { files } = element;
        if (files && files?.length > 0) {
          const file = files[0];
          if (file) {
            const element = {
              elem: "div",
              val: file.name,
            };
            const elem = Renderer(element);
            if(elem){
              document.body.appendChild(elem);
            }
           
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
