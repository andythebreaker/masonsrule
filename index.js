// Track the nodes and connections
var nodes = [];
var connections = [];
var dotGraph = "";
var step2loop = [];
var NoTouches = [];
var step1;

function remove_incorrect_addition_and_subtraction(var_text) {
    let pattern = /[\+\-\*\/]+\s*[\+\-]+/gm;
  
    while (pattern.test(var_text)) {
      var_text = var_text.replace(pattern, '');
    }

    let p2 = /[\+\-\/\*]+\s*([\)\]\}])/gm;
    while (p2.test(var_text)) {
        var_text = var_text.replace(p2, `$1`);
      }
  
    return var_text;
  }
  function replaceFractionWithParentheses(inputText) {
    // Use a regular expression to find and replace \frac{}{} with ()/()
    const regex = /\\frac\{(.+?)\}\{(.+?)\}/g;
    const replacedText = inputText.replace(regex, '($1)/($2)');
    return replacedText;
  }

function copyTextToClipboard(stuffToCopy) {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    
    // Set the value of the temporary input to the text to be copied
    tempInput.value = stuffToCopy;
    
    // Append the temporary input element to the DOM
    document.body.appendChild(tempInput);
    
    // Select the text in the input field
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);

    // Display a message to the user
    alert("Text has been copied to the clipboard: " + stuffToCopy);
}

function saveAs(blob, filename) {
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

function findAllLoopPaths(nodes, connections) {
    /*  // Example usage
  const nodes = ['n1', 'n2', 'k1', 'k2'];
  const connections = [
    { source: 'n1', target: 'n2', wire: 'n1n2' },
    { source: 'n1', target: 'k1', wire: 'nk' },
    { source: 'k1', target: 'n1', wire: 'kn' }
  ];
  
  const loopPaths = findAllLoopPaths(nodes, connections);
  console.log(loopPaths);*/
    const loopPaths = [];

    // Recursive depth-first search function
    function dfs(node, path, visited) {
        // Add the current node to the path
        path.push(node);

        // Mark the node as visited
        visited.add(node);

        // Iterate over the connections
        const connectedNodes = connections
            .filter(connection => connection.source === node)
            .map(connection => connection.target);

        // Recursive call for each connected node
        connectedNodes.forEach(connectedNode => {
            if (path.includes(connectedNode)) {
                // Found a loop
                const startIndex = path.indexOf(connectedNode);
                const loopPath = path.slice(startIndex);
                loopPaths.push(loopPath);
            } else if (!visited.has(connectedNode)) {
                dfs(connectedNode, path.slice(), new Set(visited));
            }
        });
    }

    // Iterate over each node as the starting point
    nodes.forEach(node => {
        dfs(node, [], new Set());
    });

    return loopPaths;
}

function removeSingleElementSubarrays(array) {
    return array.map(element => {
        if (Array.isArray(element) && element.length === 1) {
            //skip
        } else {
            return element;
        }
    });
}

function removeAllUndefineElenemtINArray(array) {
    return array.filter(element => {
        if (element === undefined) {
            //skip
        } else {
            return element;
        }
    });
}

function removeDuplicateSubArrays(arr) {
    const seen = new Set();
    const result = [];

    for (const subArr of arr) {
        const sortedSubArr = subArr.slice().sort();
        const subArrString = JSON.stringify(sortedSubArr);

        if (!seen.has(subArrString)) {
            seen.add(subArrString);
            result.push(subArr);
        }
    }

    return result;
}

function findAllPaths(nodes, connections, startNode, endNode) {
    // Example usage
    /*const nodes = ['n1', 'n2', 'k1', 'k2'];
    const connections = [
        { source: 'n1', target: 'n2', wire: 'n1n2' },
        { source: 'n1', target: 'k1', wire: 'nk' },
        { source: 'k1', target: 'n1', wire: 'kn' }
    ];
    
    const startNode = 'n1';
    const endNode = 'n2';
    
    const allPaths = findAllPaths(nodes, connections, startNode, endNode);
    console.log(allPaths);*/
    const visitedNodes = new Set(); // To keep track of visited nodes
    const allPaths = []; // To store all paths

    // Recursive function to find paths
    function findPath(currentNode, currentPath) {
        currentPath.push(currentNode);

        if (currentNode === endNode) {
            allPaths.push(currentPath.flat());
        }

        visitedNodes.add(currentNode);

        // Iterate through connections to find next nodes
        for (const connection of connections) {
            if (connection.source === currentNode && !visitedNodes.has(connection.target)) {
                findPath(connection.target, [...currentPath, [connection.wire]]);
            }
        }

        currentPath.pop(); // Remove the current node from the path
        visitedNodes.delete(currentNode); // Reset visited status after exploring all connections
    }

    // Find all paths starting from the given startNode
    findPath(startNode, []);

    return allPaths;
}

function setNoTouches(number, cb) {
    //var noTouchesElement = document.getElementById('noTouches');

    for (var num = 1; num <= number; num++) {
        //var h3Element = document.createElement('h3');
        //h3Element.textContent = `total ${num} of loop not Touches`;
        //var tmp_d = document.createElement('div');
        var pack_num_delta_element = [];
        var tmp_xz = combination(step2loop, num);
        tmp_xz.forEach((tmp_zx) => {
            if (!(hasCommonElement(tmp_zx))) {
                pack_num_delta_element.push(tmp_zx.flat());
            }
        });
        //noTouchesElement.appendChild(h3Element);
        NoTouches.push(pack_num_delta_element);
    }
    cb();
}
function hasCommonElement(arrays) {
    for (let k = 0; k < arrays.length; k++) {
    // Create a Set from the first array
    var parrentARY=arrays[k];
    var set = new Set(parrentARY);

    //touch的判定是:不管node 或 branch
for(let i=0;i<parrentARY.length;i++){
//go through array "connections"
for(let j=0;j<connections.length;j++){
if(connections[j].wire===parrentARY[i]){
    set.add(connections[j].source);
    set.add(connections[j].target);
}
}}

    // Check if any element in the remaining arrays is present in the set
    for (let i = 0; i < arrays.length; i++) {if(i!==k){
        var currentArray = arrays[i];
        var caplum=[...currentArray];
    //touch的判定是:不管node 或 branch
    for(let i_cap=0;i_cap<currentArray.length;i_cap++){
        //go through array "connections"
        for(let j_cap=0;j_cap<connections.length;j_cap++){
        if(connections[j_cap].wire===currentArray[i_cap]){
            caplum.push(connections[j_cap].source);
            caplum.push(connections[j_cap].target);
        }
        }}

        for (let j = 0; j < caplum.length; j++) {
            if (set.has(caplum[j])) {
                return true; // Common element found
            }
        }
    }}
    }
    return false; // No common element found
}


function combination(arr, num) {
    // 示例用法
    /*const array = [1, 2, 3, 4, 5];
    const number = 3;
    
    const result = combination(array, number);
    console.log(result);*/
    const result = [];

    function backtrack(comb, start) {
        if (comb.length === num) {
            result.push(comb.slice()); // 添加当前组合到结果数组
            return;
        }

        for (let i = start; i < arr.length; i++) {
            comb.push(arr[i]); // 添加当前元素到组合
            backtrack(comb, i + 1); // 递归调用，选择下一个元素
            comb.pop(); // 回溯，移除当前元素，尝试下一个元素
        }
    }

    backtrack([], 0); // 调用回溯函数，初始组合为空，从索引 0 开始
    return result;
}




window.onload = function () {
    // Create an empty graph
    var graph = d3.select("#graphContainer").graphviz();

    // Add a new node to the graph
    function addNode() {
        var newNode = prompt("Enter node name:");
        if (newNode) {
            nodes.push(newNode);
            updateGraph();
        }
    }

    // Connect two nodes
    function connectNodes() {
        var sourceNode = prompt("Enter source node name:");
        var targetNode = prompt("Enter target node name:");
        var wireName = prompt("Enter wire name:");
        if (sourceNode && targetNode && wireName) {
            connections.push({ source: sourceNode, target: targetNode, wire: wireName });
            updateGraph();
        }
    }

    // Update the graph with current nodes and connections
    function updateGraph() {
        dotGraph = "digraph {";

        // Add nodes to the graph
        nodes.forEach(function (node) {
            dotGraph += node + ";";
        });

        // Add connections to the graph
        connections.forEach(function (connection) {
            dotGraph += connection.source + " -> " + connection.target + ' [label="' + connection.wire + '"];';
        });

        dotGraph += "}";

        // Render the updated graph
        graph.renderDot(dotGraph);
    }

    // Add event listeners to the buttons
    document.getElementById("addNodeBtn").addEventListener("click", addNode);
    document.getElementById("connectNodesBtn").addEventListener("click", connectNodes);
    document.getElementById("findForwardPathBtn").addEventListener("click", function () {
        var ns = prompt("Enter start node name:");
        var ne = prompt("Enter end node name:");
        var ans = findAllPaths(nodes, connections, ns, ne);
        //ans.foreach(ans_.foreach(ans__=>if ans__ in nodes then remove ans__))
        step1 = ans;//!important! ans === step1 (by addr., not by value)
        step1.forEach((ans_,index_of_ans_)=>{
            ans_.forEach((ans__,index_of_ans__)=>{
                if(nodes.includes(ans__)){
                    ans_.splice(index_of_ans__,1);
                }
            });
            step1[index_of_ans_]=ans_.flat();
        });
        //display ans to <ul id="forwardPathList"></ul>
        var ul = document.getElementById("forwardPathList");
        ul.innerHTML = "";
        for (var i = 0; i < ans.length; i++) {
            var li = document.createElement("li");
            //add class class="item"
            li.setAttribute("class", "item");
            li.appendChild(document.createTextNode(ans[i]));
            ul.appendChild(li);
        }
        //update <p id="pathCount"></p>
        document.getElementById("pathCount").innerHTML = ans.length;
    });
    //listen to button downloadGraphvizBtn
    document.getElementById("downloadGraphvizBtn").addEventListener("click", function () {
        var dotGraph = "digraph {";

        // Add nodes to the graph
        nodes.forEach(function (node) {
            dotGraph += node + ";";
        });

        // Add connections to the graph
        connections.forEach(function (connection) {
            dotGraph += connection.source + " -> " + connection.target + ' [label="' + connection.wire + '"];';
        });

        dotGraph += "}";

        //download dotGraph
        var blob = new Blob([dotGraph], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "graph.dot");
    }
    );
    //listen to <button id="loadGraphvizBtn">Load Graphviz</button>
    document.getElementById("loadGraphvizBtn").addEventListener("click", function () {
        var file = document.getElementById("graphvizFile").files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var dotGraph = evt.target.result;
            //handel "digraph {" at start of dot file
            dotGraph = dotGraph.replace("digraph {", "");
            //parse dotGraph to nodes and connections
            var lines = dotGraph.split(";");
            for (var i = 0; i < lines.length - 1; i++) {
                var line = lines[i];
                if (line.includes("->")) {
                    var source = line.split("->")[0].trim();
                    var target = line.split("->")[1].split("[")[0].trim();
                    var wire = line.split("->")[1].split("[")[1].split("=")[1].split("]")[0].trim();
                    //remove `'`, `"` from source, target, wire
                    source = source.replace(/'/g, "");
                    source = source.replace(/"/g, "");
                    target = target.replace(/'/g, "");
                    target = target.replace(/"/g, "");
                    wire = wire.replace(/'/g, "");
                    wire = wire.replace(/"/g, "");
                    connections.push({ source: source, target: target, wire: wire });
                } else {
                    var node = line.trim();
                    nodes.push(node);
                }
            }
            updateGraph();
        }
    });
    //listen to <button id="findAllLoopPathsBtn">Find All Loop Paths</button>
    document.getElementById("findAllLoopPathsBtn").addEventListener("click", function () {
        var ans = removeDuplicateSubArrays(removeAllUndefineElenemtINArray(removeSingleElementSubarrays(findAllLoopPaths(nodes, connections))));
        for (var i = 0; i < ans.length; i++) {
            var a = ans[i];
            var tmp_step2loop = [];
            for (var j = 0; j < a.length; j++) {
                if (j > 0) {
                    const regex = new RegExp(`${a[j - 1]} -> ${a[j]} \\[label=\\"([^\\"]+)\\"\\]`, 'gm');
                    const str = dotGraph;
                    let m;
                    var only1 = ""
                    while ((m = regex.exec(str)) !== null) {
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        m.forEach((match, groupIndex) => {
                            //console.log(`Found match, group ${groupIndex}: ${match}`);
                            only1 = match;
                        });
                    }
                    tmp_step2loop.push(only1);
                } else {
                    const regex = new RegExp(`${a.at(-1)} -> ${a[0]} \\[label=\\"([^\\"]+)\\"\\]`, 'gm');
                    const str = dotGraph;
                    let m;
                    var only1 = ""
                    while ((m = regex.exec(str)) !== null) {
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        m.forEach((match, groupIndex) => {
                            //console.log(`Found match, group ${groupIndex}: ${match}`);
                            only1 = match;
                        });
                    }
                    tmp_step2loop.push(only1);
                }
            }
            step2loop.push(tmp_step2loop);
        }
        //display step2loop to <ul id="loopPathList"></ul>
        var ul = document.getElementById("loopPathList");
        ul.innerHTML = "";
        for (var i = 0; i < step2loop.length; i++) {
            var li = document.createElement("li");
            //add class class="item"
            li.setAttribute("class", "item");
            li.appendChild(document.createTextNode(step2loop[i]));
            ul.appendChild(li);
        }
        //update <p id="loopPathCount"></p>
        document.getElementById("loopPathCount").innerHTML = step2loop.length;
    });
    //listen to <button id="findAllNonTouchingLoopPathsBtn">Find All Non-Touching Loop Paths</button>
    document.getElementById("findAllNonTouchingLoopPathsBtn").addEventListener("click", function () {
        setNoTouches(step2loop.length, () => {
            //add 3D array NoTouches to <div id="noTouches"></div>
            var div = document.getElementById("noTouches");
            div.innerHTML = "";
            for (var i = 0; i < NoTouches.length; i++) {
                //add h3 "delta pack number ${i+1}"
                var h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode(`find all ${i+1} loop non-touched (delta pack number ${i + 1})`));
                //add style style="font-family: 'ChenYuluoyan-Thin', sans-serif; font-size: 2.2rem;"
                h3.setAttribute("style", "font-family: 'ChenYuluoyan-Thin', sans-serif; font-size: 2.2rem;");
                div.appendChild(h3);
                //foreach sub-array in NoTouches[i], add <li></li>
                var ul = document.createElement("ul");
                //add class class="ui bulleted list"
                ul.setAttribute("class", "ui bulleted list");
                for (var j = 0; j < NoTouches[i].length; j++) {
                    var li = document.createElement("li");
                    //add class class="item"
                    li.setAttribute("class", "item");
                    li.appendChild(document.createTextNode(NoTouches[i][j]));
                    ul.appendChild(li);
                }
                div.appendChild(ul);
            }
        });
    });
    //listen to <button id="calculateDeltaBtn">Calculate Delta</button>
    document.getElementById("calculateDeltaBtn").addEventListener("click", function () {
        var delta = "1";
        for (var i = 0; i < NoTouches.length; i++) {
            var sub3d3 = NoTouches[i];
            var sub3d_1f_2a = [];
            sub3d3.forEach((sub2d2, index) => {
                sub3d_1f_2a.push(sub2d2.join(" * "));
            });
            if (i % 2 == 0) {
                delta += `- ( ${sub3d_1f_2a.join(" + ")} )`;
            } else {
                delta += `+ ( ${sub3d_1f_2a.join(" + ")} )`;
            }
        }
        document.getElementById("delta").innerHTML = delta;
    }
    );
    //listen <button id="calculateNumeratorBtn">(5) Calculate Numerator</button>
    document.getElementById("calculateNumeratorBtn").addEventListener("click", function () {
        var numerator_array = [];
        step1.forEach((forwardPathListItem, index) => {
            var minus_plus_array="1";
            var caplum_forwardPathListItem=[...forwardPathListItem];
           //touch的判定是:不管node 或 branch
           for(let i_cap=0;i_cap<forwardPathListItem.length;i_cap++){
               //go through array "connections"
               for(let j_cap=0;j_cap<connections.length;j_cap++){
               if(connections[j_cap].wire===forwardPathListItem[i_cap]){
                   caplum_forwardPathListItem.push(connections[j_cap].source);
                   caplum_forwardPathListItem.push(connections[j_cap].target);
               }
               }}   
            NoTouches.forEach((loopCountListItem_plus, idx) => {
                var sumArray = [];
                    loopCountListItem_plus.forEach((loopItem_times, i) => {
                    //check if any element in loopItem_times === any element in forwardPathListItem
                    var isTouching = false;
                    var caplum=[...loopItem_times];
                    //touch的判定是:不管node 或 branch
                    for(let i_cap=0;i_cap<loopItem_times.length;i_cap++){
                        //go through array "connections"
                        for(let j_cap=0;j_cap<connections.length;j_cap++){
                        if(connections[j_cap].wire===loopItem_times[i_cap]){
                            caplum.push(connections[j_cap].source);
                            caplum.push(connections[j_cap].target);
                        }
                        }} 
                        caplum.forEach((loopItem, j) => {
                        caplum_forwardPathListItem.forEach((forwardPathItem, k) => {
                            if (loopItem === forwardPathItem) {
                                isTouching = true;
                            }
                        });
                    }
                    );
                    if (!isTouching) {
                        sumArray.push(loopItem_times.join(" * "));
                    }
                });
                minus_plus_array+=`${(idx%2==0)?"-":"+"} ( ${sumArray.join(" + ")} )`;
            });
            numerator_array.push(`[ ${forwardPathListItem.join(" * ")} ] * [ ${minus_plus_array} ]`);
        });
        //<h3 id="Numerator"></h3> = numerator_array.join(+)
        document.getElementById("Numerator").innerText = numerator_array.join(" + ");
    });
    //listen to calculateFinalBtn
    document.getElementById("calculateFinalBtn").addEventListener("click", function () {
        var Dnur = document.getElementById("delta").innerText;
        var numR = document.getElementById("Numerator").innerText;
        var text = `$\\frac{${numR}}{${Dnur}}$`;

/**code part for X => () */
const regex_no_white_space = /\(\W\)/gm;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('\\(\\W\\)', 'gm')

//const str = `\$\\frac{[ N1 * G1 * M1 * G3 ] * [ 1- ( HM2 * G2 )+ ( )- ( ) ] + [ N1 * G1 * G2 * O1 * G3 ] * [ 1- ( )+ ( )- ( ) ]}{1- ( HM3 * G3 + HM2 * G2 + HM1 * G1 * G2 )+ ( HM3 * G3 * HM2 * G2 + HM3 * G3 * HM1 * G1 * G2 )- ( )}\$`;
const subst_no_white_space = ``;

// The substituted value will be contained in the result variable
const result_no_white_space = text.replace(regex_no_white_space, subst_no_white_space);
text=remove_incorrect_addition_and_subtraction(result_no_white_space);
//console.log('Substitution result: ', result);

/**end of segment */

        copyTextToClipboard(replaceFractionWithParentheses(text.replace(/\$/g, '')));
        var generator = new latexjs.HtmlGenerator({ hyphenate: false })

        generator = latexjs.parse(text, { generator: generator })

        document.head.appendChild(generator.stylesAndScripts(""))
        document.getElementById('finalAns').appendChild(generator.domFragment())
    });
};
