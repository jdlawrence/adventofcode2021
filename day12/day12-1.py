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
                self._graph_dict[x]['vertices'].append(self.classify(y))
            else:
                self._graph_dict[x]['vertices'] = [self.y]


def solve():
    graph = Graph()
    graph.add_vertex('start')
    graph.add_vertex('bc')
    graph.add_vertex('end')
    graph.add_vertex('CD')

    for row in data:
        node1, node2 = row.split('-')

    print(node1, node1)

print(solve())
