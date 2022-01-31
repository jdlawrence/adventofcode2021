with open('sample-input.txt') as f:
    data = f.read().strip().split('\n')

class Graph(object):
    def __init__(self, graph_dict=None):
        self._graph_dict = {}

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

    def count_exceeded(self, path, new_vertex):
        vertices = {}
        small_cave_twice = False
        for vertex in path:
            if vertex.islower():
                if vertex in vertices:
                    vertices[vertex] += 1
                    if vertices[vertex] == 2:
                        small_cave_twice = True
                else:
                    vertices[vertex] = 1

        if small_cave_twice:
            return new_vertex in path
        else:
            return False

    def find_all_paths(self, start_vertex, end_vertex, path=[]):
        """ find all paths from start_vertex to
            end_vertex in graph """
        graph = self._graph_dict
        path = path + [start_vertex]
        if start_vertex == end_vertex:
            return [path]
        if start_vertex not in graph:
            return []
        paths = []
        for vertex in graph[start_vertex]:
            if vertex != 'start':
                if vertex.isupper() or vertex.islower() and not self.count_exceeded(path, vertex):
                    extended_paths = self.find_all_paths(vertex,
                                                     end_vertex,
                                                     path)
                    for p in extended_paths:
                        paths.append(p)
        return paths


def solve():
    graph = Graph()

    for row in data:
        v1, v2 = row.split('-')
        graph.add_edge([v1, v2])

    return graph.find_all_paths('start', 'end')

print(len(solve()))
