    const listContainer = document.getElementById('ft_list');
    const newBtn = document.getElementById('new-btn');

    // Load from cookie
    window.onload = function() {
      const saved = getCookie("todo_list");
      if (saved) {
        try {
          const todos = JSON.parse(saved);
          todos.forEach(todo => addTodo(todo));
        } catch (e) {
          console.error("Corrupted cookie");
        }
      }
    };

    newBtn.onclick = function() {
      const text = prompt("Enter your new TO DO:");
      if (text && text.trim()) {
        addTodo(text.trim(), true);
      }
    };

    function addTodo(text, save = false) {
      const div = document.createElement("div");
      div.className = "todo";
      div.innerText = text;

      div.onclick = function() {
        if (confirm("Do you really want to delete this TO DO?")) {
          div.remove();
          updateCookie();
        }
      };

      listContainer.insertBefore(div, listContainer.firstChild);

      if (save) updateCookie();
    }

    function updateCookie() {
      const todos = Array.from(document.querySelectorAll(".todo")).map(el => el.innerText);
      document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=31536000";
    }

    function getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
    }