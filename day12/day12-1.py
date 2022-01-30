with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

print(data)

class Graph(object):
    def __init__(self, graph_dict=None):
        self._graph_dict = {}

    def classify(self, vertex):
        if vertex == 'start':
            return 'start'
        elif vertex == 'end':
            return 'end'
        elif vertex.isupper():
            return 'big'
        else:
            return 'small'

    def add_vertex(self, vertex):
        if vertex not in self._graph_dict:
            self._graph_dict[vertex] = {
                'name': vertex,
                'type': self.classify(vertex),
                'vertices': []
            }

    def add_edge(self, edge):
        """ assumes that edge is of type set, tuple or list;
            between two vertices can be multiple edges!
        """
        edge = set(edge)
        vertex1, vertex2 = tuple(edge)
        for x, y in [(vertex1, vertex2), (vertex2, vertex1)]:
            if x in self._graph_dict:
                self._graph_dict[x].append(y)
            else:
                self._graph_dict[x] = [y]

    def find_path(self, start_vertex, end_vertex, path=None):
        """ find a path from start_vertex to end_vertex
            in graph """
        if path == None:
            path = []
        graph = self._graph_dict
        path = path + [start_vertex]
        if start_vertex == end_vertex:
            return path
        if start_vertex not in graph:
            return None
        for vertex in graph[start_vertex]:
            if vertex not in path:
                extended_path = self.find_path(vertex,
                                               end_vertex,
                                               path)
                if extended_path:
                    return extended_path
        return None


def solve():
    graph = Graph()
    # graph.add_vertex('start')
    # graph.add_vertex('bc')
    # graph.add_vertex('end')
    # graph.add_vertex('CD')

    for row in data:
        v1, v2 = row.split('-')
        graph.add_edge([v1, v2])

    # print(node1, node1)
    return graph.find_path('start', 'end')
    r = 5

print(solve())
