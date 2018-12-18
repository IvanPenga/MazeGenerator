import cv2
import numpy as np

cv2.namedWindow("win")

maze = cv2.imread("maze2.png")
gray = cv2.cvtColor(maze,cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(gray, 20, 255, cv2.THRESH_BINARY)[1]

thresh = gray

sX = 9
sY = 9

way = []
way.append((sY,sX))

while True:
    if ((gray[sY+10,sX] > 70 and gray[sY+10,sX] < 80) or 
        (gray[sY-10,sX] > 70 and gray[sY-10,sX] < 80) or
        (gray[sY,sX+10] > 70 and gray[sY,sX+10] < 80) or
        (gray[sY,sX-10] > 70 and gray[sY,sX-10] < 80)):
            print("Program je zavrsio. Put - {0}".format(way))
            break

    if gray[sY,sX + 10] == 255:
        sX = sX + 10
        way.append((sY,sX))
        cv2.circle(gray,(sX,sY), 3, 127, -1)

    elif gray[sY + 10,sX] == 255:
        sY = sY + 10
        way.append((sY,sX))
        cv2.circle(gray,(sX,sY), 3, 127, -1)
    
    elif gray[sY - 10,sX] == 255:
        sY = sY - 10
        way.append((sY,sX))
        cv2.circle(gray,(sX,sY), 3, 127, -1)

    elif gray[sY,sX - 10] == 255:
        sX = sX - 10
        way.append((sY,sX))
        cv2.circle(gray,(sX,sY), 3, 127, -1)
    else:
        del way[-1]
        sY = way[-1][0]
        sX = way[-1][1]
        cv2.circle(gray,(sX,sY), 3, 200, -1)


drawWay = [(b, a) for a, b in way]
drawWay = np.asarray(drawWay)

cv2.polylines(maze,[drawWay],False,(0,0,255),3)

cv2.imshow("win",maze)
cv2.waitKey(0)
cv2.destroyAllWindows()