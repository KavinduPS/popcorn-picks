from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

movies = pickle.load(open('../model/final_data_dict.pkl', 'rb'))
similarity = pickle.load(open('../model/similarity.pkl', 'rb'))

@app.route('/recommend', methods=['POST'])
def recommend():
    movie = request.json.get('movie')

    if movie not in movies['movie_title'].values():
        return jsonify({'error': 'Movie not found'}), 404

    movie_index = list(movies['movie_title'].values()).index(movie)
    distances = similarity[movie_index]

    recommended = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    result = [movies['movie_title'][i[0]] for i in recommended]

    return jsonify({'recommended': result})

if __name__ == '__main__':
    app.run(debug=True)
