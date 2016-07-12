import sys
sys.path.append('./pystache')
sys.path.append('./markdown')
sys.path.append('./colour')
import pygments
import pystache
import markdown
import os
import random
from colour import Color

# encoding=utf8  
import sys  

reload(sys)  
sys.setdefaultencoding('utf8')

renderer = pystache.Renderer(search_dirs=["templates/", "assets/html/"], file_extension = None)
renderer.load_template('site_template')

files = os.listdir('./md') #list of md files to convert to html

#each entry is a tuple, first elem is html, second is dict of metadata, last is filename
postList = []

md = markdown.Markdown(extensions=['meta','markdown.extensions.fenced_code','markdown.extensions.codehilite',])

#get project dirs here

projDirs = [x[0] for x in os.listdir("./projects-source")]
print(projDirs)



class basicPage(object):
    def about(self):
        return 'a b o u t'
    def posts(self):
        return 'p o s t s'
    def projects(self):
        return 'p r o j e c t s'
    def aboutLink(self):
        return "about.html"
    def indexLink(self):
        return "index.html"
    def projectsLink(self):
        return "projects.html"
    def upDir(self):
        return ""
    def extras(self):
        return ""
    def pageTitle(self):
        return "Joe Bergeron"


        
def _render_single_post(post):
    print(file)
    htmlPost = open('./posts/'+ file[0:len(file)-3]+'.html', 'w+')

    renderer.load_template('site_template')
    class _siteTemplate(basicPage):
        def siteBody(self):
            return post[0]
        def aboutLink(self):
            return "../about.html"
        def indexLink(self):
            return "../index.html"
        def projectsLink(self):
            return "../projects.html"
        def upDir(self):
            return "../"
        def extras(self):
            return "textPost"
        def pageTitle(self):
            return post[1]['title'][0] + " - Joe Bergeron"
        
    #temp= "<span class='textPost'>"
    temp = renderer.render(_siteTemplate())
    #temp += "</span>"
    htmlPost.write(temp)
    htmlPost.close()


def _render_single_project(post):
    htmlPost = open('./projects/'+ post[-1][0:len(post[-1])-3]+'.html', 'w+')
    
    renderer.load_template('site_template')
    class _siteTemplate(basicPage):
        def siteBody(self):
            return post[0]
        def aboutLink(self):
            return "../about.html"
        def indexLink(self):
            return "../index.html"
        def projectsLink(self):
            return "../projects.html"
        def upDir(self):
            return "../"
        def extras(self):
            return "textPost"
        def pageTitle(self):
            return post[1]['title'][0] + ' - Joe Bergeron'
        
    #temp= "<span class='textPost'>"
    temp = renderer.render(_siteTemplate())
    #temp += "</span>"
    htmlPost.write(temp)
    htmlPost.close()
    
projFiles = []

for dir in projDirs:
    markDown =  [x for x in os.listdir("./projects-source/"+dir+"/md/") if '~' not in x][0]
    with open("./projects-source/"+dir+"/md/"+markDown) as myfile:
        html = myfile.read()
        temp = []
        temp.append(md.convert(html))

        temp.append(md.Meta)
        temp.append(markDown)
        projFiles.append(temp)
        print(temp)
        _render_single_project(temp)
        
    


    
for file in files:
    with open('md/'+file, 'r') as myfile:

        if file[len(file)-2:len(file)] == "md":
            html = myfile.read()
            temp = []
            temp.append(md.convert(html))

            temp.append(md.Meta)
            temp.append(file)
            postList.append(temp)

            _render_single_post(temp)

            


# sort list by dates here, convert to standard format first





def render_projects():

    bodyString = ""
    cssString = ""
    
    renderer.load_template("project_entry")
    
    for proj in projFiles:
        class _projectEntry(object):
            def title(self):
                return proj[1]['title'][0]
            def link(self):
                return './projects/'+ proj[2][0:len(proj[2])-3]+".html"
            def photo(self):
                return './projects-source/'+proj[1]['postnum'][0]+'/cover.jpg'

        bodyString += renderer.render(_projectEntry())


    class _siteTemplate(basicPage):
            def projects(self):
                return '| p r o j e c t s |'
            def siteBody(self):
                return bodyString
            
    renderer.load_template('site_template')
    rendered_projects = open("projects.html", "w+")
    rendered_projects.write(renderer.render(_siteTemplate()))
    rendered_projects.close()

    

    
def render_about():
    renderer.load_template('site_template')
    with open('assets/html/about.html', 'r') as myfile:
        about_template = myfile.read()
        
        class _siteTemplate(basicPage):
            def about(self):
                return '| a b o u t |'
            def siteBody(self):
                return str(about_template)
        rendered_about = open("about.html", "w+")
        rendered_about.write(renderer.render(_siteTemplate()))
        rendered_about.close()

def render_index():
    bodyString = ""
    cssString = ""
    
    renderer.load_template('post_entry')
    
    r = lambda: random.randint(0,255)
    init_col = Color(hsl=(0, .4, .7))
    inc = .05
    count = 1;
    for post in postList:
        class _postEntry(object):

            def title(self):
                return post[1]['title'][0]
            def number(self):
                return str(count)
            def link(self):
                return './posts/'+ post[2][0:len(post[2])-3]+'.html'
        
        bodyString += renderer.render(_postEntry())
        

        renderer.load_template('custom_colors')

        class _customColors(object):
            def color(self):
                return  Color(hsl = (init_col.hsl[0], .9, .8)).hex
            def id(self):
                return str(count)
            def firstColor(self):
                return init_col.hex
            
                    
        cssString += renderer.render(_customColors())
                    
        count += 1;
        init_col = Color(hsl = (init_col.hsl[0]+ inc, .4,.7))

    class _siteTemplate(basicPage):
            def posts(self):
                return '| p o s t s |'
            def siteBody(self):
                return bodyString
    renderer.load_template('site_template')
    rendered_about = open("index.html", "w+")
    rendered_about.write(renderer.render(_siteTemplate()))
    rendered_about.close()
    rendered_customColors = open("assets/css/custom_colors.css", "w+")
    rendered_customColors.write(cssString)
    rendered_customColors.close()
            

    
    
render_about()
render_index()
render_projects()
