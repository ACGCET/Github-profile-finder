$(document).ready(function(){

	$('#searchUser').on('keyup',function(e){
		// console.log(e.target.value);
		let username = e.target.value;
if(username.length==0){
	location.reload();
}
		//make request to Github 
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'a52c77d230bacbf988c1',
				client_secret:'d9c53cd465a68e245e41bb0109e1ed6ab3d72fc4'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
					per_page: 5,
				client_id:'a52c77d230bacbf988c1',
				client_secret:'d9c53cd465a68e245e41bb0109e1ed6ab3d72fc4',
				sort:'created:asc'
				
			}
			}).done(function(repos){
				$.each(repos,function(index,repo){

					$('#repos').append(`
							<div class="card">
							 <div class="card-body">
							<div class="row">
							<div class="col-md-7">
								<strong>${repo.name}</strong><br><br> ${repo.description}
							</div>
							<div class="col-md-3"><br>
							<span class="badge badge-dark bd">Forks: ${repo.forks_count}</span>
<span class="badge badge-primary bd">Watchers: ${repo.watchers_count}</span>
<span class="badge badge-success bd">Stars: ${repo.stargazers_count}</span>
							</div>
							<div class="col-md-2"><br>
							<a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo page</a>
							</div>
							</div>
							</div></div><br>
						`)
				})
			})



			$('#profile').html(`
					<div class="card">
  <div class="card-header">
    ${user.name}
  </div>
  <div class="card-body">
   <div class="row">
   <div class="col-md-3">
   <img class="thumbnail avatar" src="${user.avatar_url}">
   <a target="_blank" class="btn btn-info btn-block" href="${user.html_url}">View Profile</a>
   <br><br>
   </div>
   <div class="col-md-9">
   <span class="badge badge-dark bd">Public Repos: ${user.public_repos}</span>
<span class="badge badge-primary bd">Public Gists: ${user.public_gists}</span>
<span class="badge badge-success bd">Followers: ${user.followers}</span>
<span class="badge badge-info bd">Following: ${user.following}</span>
<br><br><br><br>
<ul class="list-group">
<li class="list-group-item">Company: ${user.company}</li>
<li class="list-group-item">Website/Blog: ${user.blog}</li>
<li class="list-group-item">Location: ${user.location}</li>
<li class="list-group-item">Member since: ${user.created_at}</li>
</ul>
   </div>
  </div>
</div>
</div>
<h3 class="page-header">Latest Repos</h3>
<div id="repos"></div>
				`);
		})
	})
})