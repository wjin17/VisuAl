const DIJKSTRA_DESC = `<h1>Dijkstra's Algorithm</h1>
<p>
  Djikstra's algorithm finds the shortest path between two nodes in a
  graph. After a start and a finish node are defined, all of the nodes are
  placed into a set for unvisited nodes. Each node is given a distance
  upon creation, infinity, and the node that is set as the start has its
  distance set to 0. Next, the algorithm can begin solving for the
  shortest distance.
</p>
<ol>
  <li>
    The set of unvisited nodes is sorted by distance from least to
    greatest
  </li>
  <li>
    The first node in the unvisited set is removed and set as the current
    node
  </li>
  <li>
    If the current node is a wall, move onto the next node
  </li>
  <li>
    If the current node's distance is infinity, this means that the finish
    node is unreachable and the set of visited nodes is returned
  </li>
  <li>
    If the current node is the finish node, return the set of visited
    nodes
  </li>
  <li>
    Otherwise, the current node is marked as visited. Next, it is added to
    the set of visited nodes. Finally, the current neighbor's neighbors
    have their distances set to the current node's distance +1 and their
    previous node set to the current node
  </li>
  <li>
    Finally, steps 1-6 are repeated until either the finish node has been
    found, the entire grid has been traversed, or the distance of the
    current node is infinity, indicating that the finish is unreachable
  </li>
</ol>
<p>
  If the finish node has been found, its previous nodes are traced back to
  the start and the shortest path has been found
</p>
<a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
  ><h1>More Info...</h1></a
>`;

const ASTAR_DESC = `<h1>A* Search</h1>
<p>
  A* Search finds the shortest path between two nodes in a graph. Each
  node contains a distance value (g) and a heuristic value (h) which are
  summed together to get the f score (f):
</p>
<p class="center">f(node) = g(node) + h(node)</p>
<p>
  The g score is determined by the node's distance from the start and the
  h score is determined by the node's distance from the finish (this
  example uses the Manhattan distance). After a start and a finish node
  are defined, two empty sets are defined: a closed set and an open set.
  First, the start node's g score and h score are set to 0 which result in
  an f score of 0. Then, it is set as the first item in the open set.
  Next, the algorithm performs the following steps to solve for the
  shortest distance.
</p>
<ol>
  <li>
    The open set is sorted by distance from least to greatest f score.
  </li>
  <li>
    The first node in the open set is removed, set as the current node,
    and a copy is pushed to the closed set.
  </li>
  <li>
    If the current node is equal to the finish node, return the closed
    set.
  </li>
  <li>
    Else, the top, bottom, left, and right neighbors of the current node
    are calculated.
  </li>
  <li>
    For each of the neighbors, do the following:
    <ol>
      <li>
        If the neighbor is a wall or already in the closed set, move onto
        the next neighbor.
      </li>
      <li>
        Set the neighbor's g score equal to the current node's g score +
        1.
      </li>
      <li>
        Set the neighbor's h score to its Manhattan distance from the
        finish node.
      </li>
      <li>
        Set the neighbor's f score to the sum of its g score and f score
      </li>
      <li>
        If the neighbor is already in the open set and the its g score is
        smaller than the one in the open set, move onto the next neighbor.
      </li>
      <li>
        Finally, if the neighbor passes all the checks, set its parent to
        the current node, add it to the open set, and repeat the process
        until the finish node has been discovered.
      </li>
    </ol>
  </li>
  <li>
    Once the closed set has been returned, find the shortest distance path
    by tracing the finish node's parent
  </li>
</ol>
<p>
  If the finish node has been found, its parent nodes are traced back to
  the start and the shortest path has been successfully calculated.
</p>
<a href="https://en.wikipedia.org/wiki/A*_search_algorithm"
  ><h1>More Info...</h1></a
>`;
